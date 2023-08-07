const org_abi=require('../data/DaoSystemSoftware_abi');
const utils=require("../utils")

 /**
  *  提案处理
  */
class DaoSystemSoftware
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
        'owner': this.account,
        '_hash': _proHash,
        'deadline':'1000000000000000'
      }
    }
  }

  /** 
   * 生成提案hash码
   * @param {string} proName  提案名称
   * @param {unit} value  eth
   * @param {char[42]} proxyAddrss  代理地址
   * @param {char[42]} executeAddrss 执行合约地址
   * @param {int} daoId 
   * @param {boolean} _status 提案状态
   * @param {string} _funcData 函数及参数的编码
   * @returns 
   */
  makeHash(proName,value,proxyAddrss,executeAddrss,daoId,_status,_funcData){
    let _ABICoder = new this.ethers.utils.AbiCoder();
    return this.ethers.utils.keccak256(_ABICoder.encode(
        ["tuple(string,uint64,address,address,uint32,bool,bytes)"],
        [[proName,value,proxyAddrss,executeAddrss,daoId,_status,_funcData]]))
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
   

  /** 
   * 投票
   * @param {int} _chainId 
   * @param {int} _index 
   * @param {string} proHash 
   * @returns 
  */
  async  vote(_chainId, _index, proHash) {    
    if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);
    let typedData=this.getTypedData(_chainId,_index,proHash);
    return await this.ethersProvider._signTypedData(typedData.domain,this.singerType(),typedData.message)
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
      let ifa = new this.ethers.utils.Interface(abiArray);
      //函数及参数的编码
      let installData = ifa.encodeFunctionData(functionName,JSON.parse(paraneters));  
      let proHash=this.makeHash(proName,0,proxyAddrss,executeAddrss,daoId,false,installData)
      return {
          name:proName,
          app:proxyAddrss, 
          cause:executeAddrss, 
          daoId,
          functionName,
          functionPara:paraneters,
          status:false,
          proHash,
          data:installData,
          abi:abiArray
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
            data[i]['member_index'],
            data[i]['member_address'],
            proHash,
            '1000000000000000',
            ...this.makeSignature(data[i]['vote_singer'])
          ])
      }
  
      let arr=eip712Sign.sort(function (x, y) {if (x[1] < y[1]) return -1;if (x[1] > y[1]) return 1;return 0;});
      
      let _pro = this.makePro(proName,proxyAddrss,executeAddrss,daoId,abiArray,functionName,paraneters)
      const delOrg = await this.infoObj.softwareInstallInfos(daoId); //根据daoId获取代理地址
      let _delOrgC = new this.ethers.Contract(delOrg['delegator'],this.abi , this.ethersProvider);
      let paraPro={
        name:_pro.name,
        value:0,
        plugin_delegator:_pro.app,
        execution_address:_pro.cause,
        daoId:_pro.daoId,
        is_external_proposal:_pro.status,
        data:_pro.data
      }
   //   let gasLimit=await utils.estimateGas(_delOrgC,'exec',[eip712Sign,proHash,paraPro],'6400000')
      let result = await _delOrgC.exec(arr,proHash,paraPro,{gasLimit:'6400000'})
      await result.wait();
      return result;
  }

//   async  setMember(daoId,_index,_address,_vote) {
//     const delOrg = await this.infoObj.softwareInstallInfos(daoId); //根据daoId获取代理地址
//     let _delOrgC = new this.ethers.Contract(delOrg['delegator'],this.abi , this.ethersProvider); //用代理地址创建合约
//     let result = await _delOrgC.setAccount(_index,[_address,_vote]) //调用
//     await result.wait();
//     return result;
// }


  constructor(_ethers,_ethersProvider,_account,_address,_infoObj) {
      this.ethersProvider=_ethersProvider;this.ethers=_ethers;
      this.account=_account;      
      this.address=_address;
      this.abi= org_abi.abi;
      this.infoObj=_infoObj;
  }
}



module.exports=DaoSystemSoftware