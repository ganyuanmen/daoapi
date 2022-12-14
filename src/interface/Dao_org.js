const org_abi=require('../data/org_abi');
/**
 * 提案处理
 */
class Dao_org
{
    /**
     * 提供给投票的数据
     * @param {int} _chainId  网络ID
     * @param {int} _index dao 成员序号
     * @param {string} _proHash  提案hash码
     * @returns 
     */
  getTypedData(_chainId,_index,_proHash){
    return {
      types: {
        EIP712Domain: [
          {name: "name", type: "string"},
          {name: "version", type: "string"},
          {name: "chainId", type: "uint256"},
          {name: "verifyingContract", type: "address"},
        ],
        Permit: [
          {name: "index", type: "uint16"},
          {name: "owner", type: "address"}, 
          {name: "_hash", type: "bytes32"},  
          {name: "deadline", type: "uint"}
        ]
      },
      primaryType: 'Permit',
      domain: {
        name: 'org',
        version: '1',
        chainId: _chainId,
        verifyingContract: this.address
      },
      message: {
        'index': _index,
        'owner': this.selectedAccount,
        '_hash': _proHash,
        'deadline':'1000000000000000'
      }
    }
  }

  /**
   * 生成提案hash码
   * @param {string} proName  提案名称
   * @param {char[42]} proxyAddrss  代理地址
   * @param {char[42]} executeAddrss 执行合约地址
   * @param {int} daoId 
   * @param {boolean} _status 提案状态
   * @param {string} _funcData 函数及参数的编码
   * @returns 
   */
  makeHash(proName,proxyAddrss,executeAddrss,daoId,_status,_funcData){
    let _ABICoder = new this.ether.utils.AbiCoder();
    return this.ether.utils.keccak256(_ABICoder.encode(
        ["tuple(string,address,address,uint32,bool,bytes)"],
        [[proName,proxyAddrss,executeAddrss,daoId,_status,_funcData]]))
  }

  /**
   * 投票需要提供的参数
   * @returns 
   */
  singerType() {
    return  {Permit: [
      {name: "index", type: "uint16"},
      {name: "owner", type: "address"}, 
      {name: "_hash", type: "bytes32"}, 
      {name: "deadline", type: "uint"}
    ]}
  
  }
   
    async  getInfo() {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result = await this.contract.getInfo();
        return result;
   }
   
   
    /**
     * 投票
     * @param {int} _chainId 
     * @param {int} _index 
     * @param {string} proHash 
     * @returns 
     */
    async  vote(_chainId, _index, proHash) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let typedData=this.getTypedData(_chainId,_index,proHash);
    let result = await this.etherProvider._signTypedData(typedData.domain,this.singerType(),typedData.message)
    return result;
}
   
/**
 * 签名信息 转换为 执行提案所需要参数
 * @param {string} signature 签名信息
 * @returns 
 */
makeSignature(signature){    
    const signature00 = signature.substring(2);
    const r = "0x" + signature00.substring(0, 64);
    const s = "0x" + signature00.substring(64, 128);
    const v = parseInt(signature00.substring(128, 130), 16);
    return [v,r,s]
}

/**
 * 生成提案
 * @param {string} proName 提案名称
 * @param {char[42]} proxyAddrss 代理地址
 * @param {char[42]} executeAddrss  合约执行地址
 * @param {int} daoId  
 * @param {array} abiArray  abi数组
 * @param {string} functionName 函数名称
 * @param {string} paraneters  函数参数数组json格式 JSON.stringify([2,1])
 * @returns 
 */
makePro(proName,proxyAddrss,executeAddrss,daoId,abiArray,functionName,paraneters)
{
    let ifa = new this.ether.utils.Interface(abiArray);

    //函数及参数的编码
    let installData = ifa.encodeFunctionData(functionName,JSON.parse(paraneters));  
    let proHash=this.makeHash(proName,proxyAddrss,executeAddrss,daoId,false,installData)
    return {
        name:proName,
        app:proxyAddrss, 
        cause:executeAddrss, 
        daoId,
        functionName,
        functionPara:paraneters,
        status:false,
        proHash,
        data:installData
    }
}

/**
 * 执行提案
 * @param {Array} data 签名数据 [{dao_index,vote_address,vote_singer}]
 * @param {string} proHash 提案hash码
 * @param {string} proName 提案名称
 * @param {char[42]} proxyAddrss 代理地址
 * @param {char[42]} executeAddrss  执行合约地址
 * @param {int} daoId 
 * @param {Array} abiArray  abi数组
 * @param {string} functionName 执行函数名称
 * @param {string} paraneters  函数参数数组json格式 JSON.stringify([2,1])
 * @returns 
 */
async  exec(data,proHash,proName,proxyAddrss,executeAddrss,daoId,abiArray,functionName,paraneters) {
    let eip712Sign = []
    for(let i = 0;i < data.length;i++){
        eip712Sign.push([
          data[i]['dao_index'],
          data[i]['vote_address'],
          proHash,
          '1000000000000000',
          ...this.makeSignature(data[i]['vote_singer'])
        ])
    }
    const delOrg = await this.daoValue.getOrg(daoId); //根据daoId获取代理地址
    let _delOrgC = new this.ether.Contract(delOrg,this.abi , this.etherProvider);
    let _pro = this.makePro(proName,proxyAddrss,executeAddrss,daoId,abiArray,functionName,paraneters)
    let result = await  _delOrgC.exec(eip712Sign,proHash,_pro,{gasLimit:'6400000'})
    await result.wait();
    return result;
}

    constructor(_ether,_etherProvider,_selectAccount,_valueObj,_address) {
        this.daoValue=_valueObj
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
       
       this.address=_address;
        this.abi= org_abi.abi
    }
}

module.exports=Dao_org