const register_abi=require('../data/register_abi');

class Dao_register
{
 
  /**
   * _name,名称
   *  _symbol, 符号
   * _desc 描述
   * _manager, 管理人，负责初始化logo、发行token
   * _token, 是否发行token
   * _version, 版本号 固定为1
   * _appIndex, 编号 固定为1
   * _members,成员列表
   * _votes, 投票权重列表
   * _cause 全局实行app 列表
   */
 
async  createOrg(_name, _symbol,_desc, _manager, _token,_version,_appIndex, _members,_votes, _cause) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));

    const _gas = await this.contract.estimateGas.createOrg(_name, _symbol,_desc, _manager, _token,_version,_appIndex, _members,_votes, _cause);
   let result = await this.contract.createOrg(_name, _symbol,_desc,_manager, _token,_version,_appIndex, _members,_votes, _cause,{gasLimit:parseInt(_gas.toString())+400000});
   // let result = await this.contract.createOrg(_name, _symbol,_desc,_manager, _token,_version,_appIndex, _members,_votes, _cause,{gasLimit:'6000000'});
    await result.wait();
    return result;
}

  
 
async  init(_address1,_address2) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));

   let result = await this.contract.init(_address1,_address2,{gasLimit:'6400000'});
 
    await result.wait();
    return result;
}

async  getInfo(_id) {    
     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
     let result = await this.contract.getInfo(_id);
     return result;
}

  
   setAddress(_address)
    {
        this.address=_address;
    }
    setAbi(_abi)
    {
        this.abi=_abi;
    }

    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;        
        this.address=register_abi.address;
        this.abi=register_abi.abi
    }
}

module.exports=Dao_register