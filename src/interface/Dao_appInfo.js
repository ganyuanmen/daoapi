const appInfo_abi=require('../data/appInfo_abi');
/**
 * app 安装信息
 */
class Dao_appInfo
{
    /**
     * 查询app安装代理地址
     * @param {int} _daoId  dao Id
     * @param {int} _appindex  app序号
     * @returns {delegate:'0x...',index:1,version:1}
     */
    async  getInfo(_daoId,_appindex) {    
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);   
        let result = await this.contract.getInfo(_daoId,_appindex);
        return result;
   }

 

    constructor(_ether,_etherProvider,_selectAccount,_address) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.address=_address;
        this.abi= appInfo_abi.abi
    }
}

module.exports=Dao_appInfo