
const system_abi=require('../data/DaoSystemManage_abi');
/**
 * app 安装信息
 */
class DaoSystemManage
{
    /** 
     * 插件(app)安装
     * @param {int} _daoId Dao ID
     * @param {int} _appId App ID
     * @param {int} _versionId App版本号
     * @returns 
     */
    async install(_daoId,_appId,_versionId) {
        this.genegateContract()
        const _gas =await this.contract.estimateGas.installSystem(_daoId,_appId,_versionId);
        let re= await  this.contract.installSystem(_daoId,_appId,_versionId,{gasLimit:_gas.toString()});
        await re.wait()
        return re;
    }

    //---------------------------------------------------------------------------------


    /** 
     * 取dao_delegator信息
     * @param {int} _daoId  DAO ID
     * @returns {app_id,version,delegator}
    */
      async  softwareInstallInfos(_daoId) {    
        this.genegateContract()
        return await this.contract.softwareInstallInfos(_daoId)
    }

     /** 
     * @param {address} _delegator
     * @returns dao_id
    */
     async delegatorToDaoId(_delegator) {
        this.genegateContract()
        return await  this.contract.delegatorToDaoId(_delegator);
    }   


    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }
      
    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;   
        this.abi=system_abi.abi

    }
}
module.exports=DaoSystemManage