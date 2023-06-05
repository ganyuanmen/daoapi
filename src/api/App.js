const app_abi=require('../data/app_abi');

 //app注册
class App
{

   /**app注册
    * @param {string} _type 类型（0，1）
    * @param {string} _name 名称
    * @param {string} _desc  描述
    * @param {string} _verdesc  software_version_desc
    * @param {string} _proxyTaget software_proxytarget 实行插件地址
    * @param {string} _manager  software_plugin_manager
    * @returns 
    */
    async  addApp(_type,_name,_desc,_verdesc,_proxyTaget,_manager) {    
        this.genegateContract()
        let _gas = await this.contract.estimateGas.addSoftware(_type,_name,_desc,_verdesc,_proxyTaget,_manager);
        let result = await this.contract.addSoftware(_type,_name,_desc,_verdesc,_proxyTaget,_manager,{gasLimit:_gas.toString()})
        await result.wait()
        return result;
    }

    /** app 版本升级
    * @param {string} _type 类型（0，1）
    * @param {string} _verdesc  software_version_desc
    * @param {string} _appId app ID software_id
    * @param {string} _proxyTaget software_proxytarget 实行插件地址
    * @returns software_version_id
    */
    async  updateVersion(_type,_verdesc,_appId,_proxyTaget) {    
        this.genegateContract()
        let _gas = await this.contract.estimateGas.addSoftwareVersion(_type,_verdesc,_appId,_proxyTaget);
        let result = await this.contract.addSoftwareVersion(_type,_verdesc,_appId,_proxyTaget,{gasLimit:_gas.toString()})
        await result.wait()
        return result;
    }
    //--------------------------------------------------------------------------------------
    /** 取app信息
     * @param {int} _appId  APP ID
     * @param {int} _type 1->plugin 0->system
     * @returns 1->{manager,name,desc,latestVersion} 0->{name,desc,latestVersion}
     */
    async  getInfo(_appId,_type) {    
        this.genegateContract()
        return _type===1? await this.contract.softwarePluginInfos(_appId)
                         :await this.contract.softwareSystemInfos(_appId)
    }

    /** 取相应版本的app信息
     * @param {int} _appId  APP ID
     * @param {int} _versionId  
     * @param {int} _type 1->plugin  
     * @returns  {desc,proxyTarget}
     */
    async  getVersionInfo(_appId,_versionId,_type) {    
        this.genegateContract()
        let result=_type===1?(await this.contract.softwarePluginVersions(_appId,_versionId))
                            :(await this.contract.softwareSystemVersions(_appId,_versionId))
        return result;
    }

     /** 从app name取app Id
     * @param {string} _name
     * @param {int} _type 1->plugin 0->system
     * @returns {int} app_id
     */
     async appIdFromName(_name,_type) {    
        this.genegateContract()
        return _type===1? await this.contract.softwarePluginNameToInfo(_name)
                         :await this.contract.softwareSystemNameToInfo(_name)
    }

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }
    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;    
        this.address=_address;
        this.abi= app_abi.abi
    }
}
module.exports=App