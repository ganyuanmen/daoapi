const app_abi=require('../data/app_abi');
/**
 * app地址登记
 */
class Dao_app
{
   
   /**
    * app 地址登记
    * @param {string} _name 名称
    * @param {string} _desc  描述
    * @param {string} _to 地址
    * @returns 
    */
    async  addApp(_name,_desc,_to) {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result = await this.contract.addApp(_name,_desc,_to);
        await result.wait()
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


    constructor(_ether,_etherProvider,_selectAccount,_address) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;        
        this.address=_address;
        this.abi= app_abi.abi
    }
}
Dao_app
module.exports=Dao_app