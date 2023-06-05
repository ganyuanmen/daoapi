'use strict';
const GetInfos = require('./api/GetInfos');
const DaoRegistrar = require("./api/DaoRegistrar");
const DaoToken = require("./api/DaoToken");
const IADD = require("./api/IADD");
const DaoLogo = require("./api/DaoLogo");
const Commulate = require("./api/Commulate");
const UnitToken = require("./api/UnitToken");
const DaoSystemSoftware = require("./api/DaoSystemSoftware");
const App = require("./api/App");
const GasToken = require("./api/GasToken");
const DaoPluginManage = require("./api/DaoPluginManage");
const DaoSystemManage=require("./api/DaoSystemManage")
const daismAddress = require('./data/address');

 const v=require('../package.json')


 module.exports.DaoApi =class DaoApi {
    
    get provider(){return this.ethersProvider.getSigner?this.ethersProvider.getSigner(0):this.ethersProvider}
    get Commulate() { 
        if (!this.dao_commulate_obj) 
            this.dao_commulate_obj = new Commulate(
                this.ethers,this.provider,this.account,
                daismAddress[this.network]['Commulate']
            ); 
        return this.dao_commulate_obj; 
    }
    get IADD() { 
        if (!this.dao_iadd_obj) 
            this.dao_iadd_obj = new IADD(
                this.ethers,this.provider, this.account, 
                this.Commulate,this.UnitToken,
                daismAddress[this.network]['_IADD']
            ); 
        return this.dao_iadd_obj; 
    }
    get GetInfos() { 
        if (!this.dao_getInfos_obj) 
            this.dao_getInfos_obj = new GetInfos(
                this.ethers,this.provider, this.account, 
                daismAddress[this.network]['GetInfos']
            ); 
        return this.dao_getInfos_obj; 
    }
    get DaoLogo() {
        if (!this.dao_logo_obj) 
            this.dao_logo_obj = new DaoLogo(
                this.ethers,this.provider,this.account,
                daismAddress[this.network]['DaoLogo']
            ); 
        return this.dao_logo_obj;
    }
    get DaoToken() { 
        if (!this.dao_token_obj) 
            this.dao_token_obj = new DaoToken(
                this.ethers,this.provider, this.account,
                daismAddress[this.network]['DaoToken']
            ); 
            return this.dao_token_obj; 
        }
    get UnitToken() { 
        if (!this.dao_uToken_obj) 
            this.dao_uToken_obj = new UnitToken(
                this.ethers,this.provider, this.selectedAccounta,
                daismAddress[this.network]['UnitToken']
            ); 
        return this.dao_uToken_obj; 
    }
    get DaoPluginManage() { 
        if (!this.dao_plugn_obj) 
            this.dao_plugn_obj = new DaoPluginManage(
                this.ethers,this.provider,this.account,
                daismAddress[this.network]['DaoPluginManage']
            ); 
        return this.dao_plugn_obj; 
    }
    get DaoSystemManage() { 
        if (!this.dao_appInfo_obj) 
            this.dao_appInfo_obj = new DaoSystemManage(
                this.ethers,this.provider,this.account,
                daismAddress[this.network]['DaoSystemManage']
            ); 
        return this.dao_appInfo_obj; 
    }

    get DaoSystemSoftware() { 
        if (!this.dao_org_obj) 
            this.dao_org_obj = new DaoSystemSoftware(
                this.ethers,this.provider, this.account,
                daismAddress[this.network]['DaoSystemSoftware'],
                this.DaoSystemManage
            ); 
            return this.dao_org_obj; 
    }
    get App() { 
        if (!this.dao_app_obj) 
            this.dao_app_obj = new App(
                this.ethers,this.provider, this.account,
                daismAddress[this.network]['app']
            ); 
            return this.dao_app_obj; 
        }
    get GasToken() { 
        if (!this.dao_gasToken_obj) 
            this.dao_gasToken_obj = new GasToken(
                this.ethers,this.provider, this.account,
                daismAddress[this.network]['GasToken']
            ); 
        return this.dao_gasToken_obj; 
    }
    get DaoRegistrar() { 
        if (!this.dao_register_obj) 
            this.dao_register_obj = new DaoRegistrar(
                this.ethers,this.provider, this.account,
                daismAddress[this.network]['DaoRegistrar']
            ); 
        return this.dao_register_obj; 
    }
   
    get version(){return v.version;}

    constructor(_ethers,_ethersProvider, _account,_network) {
        this.ethers=_ethers;
        this.ethersProvider = _ethersProvider;
        this.account = _account;
        this.network=_network
    }
}

if (typeof window === 'object') {
    window.DaoApi = function (_ethers,_ethersProvider, _account,_network) {
        return new module.exports.DaoApi(_ethers,_ethersProvider, _account,_network)
    }

    window.DaoApi.default = window.DaoApi;
}

