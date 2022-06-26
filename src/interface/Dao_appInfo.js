const appInfo_abi=require('../data/appInfo_abi');
class Dao_appInfo
{
    async  getInfo(_daoId,_appindex) {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);   
        let result = await this.contract.getInfo(_daoId,_appindex);
        return result;
   }

 

    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.address=appInfo_abi.address;
        this.abi= appInfo_abi.abi
    }
}

module.exports=Dao_appInfo