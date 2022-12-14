const value_abi=require('../data/value_abi');
/**
 * 获取代理地址
 */
class Dao_value
{
    /**
     * 根据daoId获取代理地址
     * @param {int} _daoId dao Id
     * @returns 
     */
    async  getOrg(_daoId) {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);   
        let result = await this.contract.getOrg(_daoId);
        return result;
   }

 

    constructor(_ether,_etherProvider,_selectAccount,_address) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.address=_address;
        this.abi=value_abi.abi
    }
}

module.exports=Dao_value