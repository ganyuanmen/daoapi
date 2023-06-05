const plugin_abi=require('../data/DaoPluginManage_abi');

/**
 * app 安装信息
 */
class DaoPluginManage
{
    /** 插件(app)安装
     * @param {int} _daoId Dao ID
     * @param {int} _appId App ID
     * @param {int} _versionId App版本号
     * @returns 
     */
    async install(_daoId,_appId,_versionId) {
        this.genegateContract()
        const _gas = await this.contract.estimateGas.install(_daoId,_appId,_versionId)         
        let re= await  this.contract.install(_daoId,_appId,_versionId,{gasLimit:_gas.toString()})       
        await re.wait()
        return re;
    }

   /** 插件(app)卸载
     * @param {int} _daoId Dao ID
     * @param {int} _delegatorId 
     * @returns 
     */
    async uninstall(_daoId,_delegatorId) {
        this.genegateContract()
        let _gas=await this.contract.estimateGas.uninstall(_daoId,_delegatorId)
        let re=  await this.contract.uninstall(_daoId,_delegatorId,{gasLimit:_gas.toString()})
        await re.wait()
        return re;
    }   

    /**  恢复已卸载插件(app)
     * @param {int} _daoId Dao ID
     * @param {int} _delegatorId 
     * @returns 
     */
    async recover(_daoId,_delegatorId) {
        this.genegateContract()
        let _gas=await this.contract.estimateGas.recover(_daoId,_delegatorId)
        let re=  await this.contract.recover(_daoId,_delegatorId,{gasLimit:_gas.toString()})
        await re.wait()
        return re;
    }   

     /** 插件(app)替换
     * @param {int} _daoId Dao ID
     * @param {int} _delegatorId 
     * @param {int} _appId
     * @param {int} _versionId  
     * @returns 
     */
     async replace(_daoId,_delegatorId,_appId,_versionId) {
        this.genegateContract()
        let _gas=await this.contract.estimateGas.replace(_daoId,_delegatorId,_appId,_versionId)
        let re=  await this.contract.replace(_daoId,_delegatorId,_appId,_versionId,{gasLimit:_gas.toString()})
        await re.wait()
        return re;
    }   

     /** 插件(app)版本升级
     * @param {int} _daoId Dao ID
     * @param {int} _delegatorId 
     * @param {int} _versionId  
     * @returns 
     */
     async update(_daoId,_delegatorId,_versionId) {
        this.genegateContract()
        let _gas=await this.contract.estimateGas.update(_daoId,_delegatorId,_versionId)
        let re=  await  this.contract.update(_daoId,_delegatorId,_versionId,{gasLimit:_gas.toString()})
        await re.wait()
        return re;
    }   
    //---------------------------------------------------------------------------------

    /** 取dao_delegator_full_id
     * @param {int} _daoId  dao Id
     * @returns {int} dao_delegator_full_id
    */
    async  delegateIdFromDaoId(_daoId) {    
       this.genegateContract()
       return await this.contract.delegatorAmount(_daoId)
    }

    /** 取dao_delegator_full_id
     * @param {char[42]} _delegateAddress  代理地址
     * @returns {int} dao_delegator_full_id
    */
    async delegateIdFromAddress(_delegateAddress) {    
        this.genegateContract()
        return await this.contract.delegatorToDelegatorFullId(_delegateAddress)
    }

    /** 取dao_delegator信息
     * @param {int} _daoId  DAO ID
     * @param {int} _delegatorId 代理ID
     * @returns {app_id,version,delegator}
    */
      async  softwareInstallInfos(_daoId,_delegatorId) {    
        this.genegateContract()
        return  await this.contract.softwareInstallInfos(_daoId,_delegatorId)
    }

    /** 判断插件(app)是否禁用，如果为true 可以用recover恢复
     * @param {int} _delegatorId
     * @returns bool
    */
    async garbageCan(_delegatorId) {
       this.genegateContract()
       return await  this.contract.recover(_delegatorId);
    }   

    
   

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }
      
    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;   
        this.abi=plugin_abi.abi

    }
}
module.exports=DaoPluginManage