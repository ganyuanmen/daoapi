'use strict';
const Dao_register = require("./interface/Dao_register");
const Dao_erc20s = require("./interface/Dao_erc20s");
const Dao_iadd = require("./interface/Dao_iadd");
const Dao_logo = require("./interface/Dao_logo");
const Dao_commulate = require("./interface/Dao_commulate");
const Dao_uToken = require("./interface/Dao_uToken");
const Dao_ethToken = require("./interface/Dao_ethToken");
const Dao_org = require("./interface/Dao_org");
const Dao_app = require("./interface/Dao_app");
 const Dao_deth = require("./interface/Dao_deth");
 const Dao_value = require("./interface/Dao_value");
 const Dao_appInfo = require("./interface/Dao_appInfo");
 const daismAddress = require('./data/address');

 const v=require('../package.json')


 module.exports.DaoApi =class DaoApi {
    
    get provider(){return this.etherProvider.getSigner?this.etherProvider.getSigner(0):this.etherProvider}
    get dao_commulate() { if (!this.dao_commulate_obj) this.dao_commulate_obj = new Dao_commulate(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['commulate']); return this.dao_commulate_obj; }
    get dao_iadd() { if (!this.dao_iadd_obj) this.dao_iadd_obj = new Dao_iadd(this.ether,this.provider, this.selectedAccount, this.dao_commulate,daismAddress[this.network]['iadd']); return this.dao_iadd_obj; }
    get dao_logo() {if (!this.dao_logo_obj) this.dao_logo_obj = new Dao_logo(this.ether,this.provider,this.selectedAccount,daismAddress[this.network]['logo']); return this.dao_logo_obj;}
    get dao_erc20s() { if (!this.dao_erc20s_obj) this.dao_erc20s_obj = new Dao_erc20s(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['erc20s']); return this.dao_erc20s_obj; }
    get dao_uToken() { if (!this.dao_uToken_obj) this.dao_uToken_obj = new Dao_uToken(this.ether,this.provider, this.selectedAccounta,daismAddress[this.network]['uToken']); return this.dao_uToken_obj; }
    get dao_ethToken() { if (!this.dao_ethToken_obj) this.dao_ethToken_obj = new Dao_ethToken(this.ether,this.provider, this.selectedAccount, this.dao_uToken, this.dao_commulate,daismAddress[this.network]['ethToken']); return this.dao_ethToken_obj; }
    get dao_org() { if (!this.dao_org_obj) this.dao_org_obj = new Dao_org(this.ether,this.provider, this.selectedAccount,this.dao_value,daismAddress[this.network]['org']); return this.dao_org_obj; }
    get dao_app() { if (!this.dao_app_obj) this.dao_app_obj = new Dao_app(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['app']); return this.dao_app_obj; }
    get dao_deth() { if (!this.dao_deth_obj) this.dao_deth_obj = new Dao_deth(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['deth']); return this.dao_deth_obj; }
    get dao_value() { if (!this.dao_value_obj) this.dao_value_obj = new Dao_value(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['value']); return this.dao_value_obj; }
    get dao_register() { if (!this.dao_register_obj) this.dao_register_obj = new Dao_register(this.ether,this.provider, this.selectedAccount,this.dao_value,daismAddress[this.network]['register']); return this.dao_register_obj; }
    get dao_appInfo() { if (!this.dao_appInfo_obj) this.dao_appInfo_obj = new Dao_appInfo(this.ether,this.provider, this.selectedAccount,daismAddress[this.network]['appInfo']); return this.dao_appInfo_obj; }
  
    get version(){return v.version;}


    constructor(_ether,_etherProvider, _selectAccount,_network) {
        this.ether=_ether;
        this.etherProvider = _etherProvider;
        this.selectedAccount = _selectAccount;
        this.network=_network
       
        this.dao_register_obj = null;
        this.dao_logo_obj=null;
        this.dao_org_obj=null;
        this.dao_value_obj=null;
        this.dao_appInfo_obj=null;
        this.dao_erc20s_obj=null;
        this.dao_commulate_obj=null;
        this.dao_iadd_obj=null;
        this.dao_uToken_obj=null;
        this.dao_ethToken_obj=null;
        this.dao_deth_obj=null;
        this.dao_app_obj=null;
       
    }
}

if (typeof window === 'object') {
    window.DaoApi = function (_ether,_etherProvider, _selectAccount,_network) {
        return new module.exports.DaoApi(_ether,_etherProvider, _selectAccount,_network)
    }

    window.DaoApi.default = window.DaoApi;
}

