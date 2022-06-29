const org_abi=require('../data/org_abi');
class Dao_org
{
    
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
  makeHash(_name,_address,_cause,_daoId,_status,_funcData){
    let _ABICoder = new this.ether.utils.AbiCoder();
    return this.ether.utils.keccak256(_ABICoder.encode(
        ["tuple(string,address,address,uint32,bool,bytes)"],
        [[_name,_address,_cause,_daoId,_status,_funcData]]))
  }

  singerType() {
    return  {Permit: [{name: "index", type: "uint16"},{name: "owner", type: "address"}, 
    {name: "_hash", type: "bytes32"}, {name: "deadline", type: "uint"}]}
  
  }
   
    async  getInfo() {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result = await this.contract.getInfo();
        return result;
   }
   
   
    async  vote(_chainId, _index, _hash) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let typedData=this.getTypedData(_chainId,_index,_hash);
    let result = await this.etherProvider._signTypedData(typedData.domain,this.singerType(),typedData.message)
    return result;
}
   

 makeSignature(signature){    
    const signature00 = signature.substring(2);
    const r = "0x" + signature00.substring(0, 64);
    const s = "0x" + signature00.substring(64, 128);
    const v = parseInt(signature00.substring(128, 130), 16);
    return [v,r,s]
}

makePro(_name,_address,_cause,_daoId,_abi,_fname,_para)
{
    let ifa = new this.ether.utils.Interface(_abi);
    let installData = ifa.encodeFunctionData(_fname,JSON.parse(_para));  
    let _hash=this.makeHash(_name,_address,_cause,_daoId,false,installData)
    return {
        name:_name,
        app:_address, //实际执行的合约
        cause:_cause,  //安装的合约
        daoId:_daoId,
        functionName:_fname,
        functionPara:_para,
        status:false,
        proHash:_hash,
        data:installData
    }
}

async  exec(data,_hash,_name,_address,_cause,_daoId,_abi,_fname,_para) {
    let eip712Sign = []
    for(let i = 0;i < data.length;i++){
        eip712Sign.push([data[i]['dao_index'],data[i]['vote_address'],_hash,'1000000000000000',...this.makeSignature(data[i]['vote_singer'])])
    }
    const delOrg = await this.daoValue.getOrg(_daoId)
    let _delOrgC = new this.ether.Contract(delOrg,this.abi , this.etherProvider);
    let _pro = this.makePro(_name,_address,_cause,_daoId,_abi,_fname,_para)
    let result = await  _delOrgC.exec(eip712Sign,_hash,_pro,{gasLimit:'6400000'})
   // const _gas = await this.contract.estimateGas.exec(_eip712Sign, _proHash, _pro);
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