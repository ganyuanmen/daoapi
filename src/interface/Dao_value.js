const value_abi=require('../data/value_abi');
class Dao_value
{
    
    async  getOrg(_daoId) {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);   
        let result = await this.contract.getOrg(_daoId);
        return result;
   }

 

    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.address=value_abi.address;
        this.abi=value_abi.abi
    }
}

module.exports=Dao_value