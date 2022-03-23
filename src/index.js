'use strict';
const Commulate = require("./interface/Commulate");
const EthToToken = require("./interface/EthToToken");
const IADD = require("./interface/IADD");
const Logos = require("./interface/Logo");
//const Register = require("./interface/Register");
const Tokens = require("./interface/Tokens");
const Utoken = require("./interface/Utoken");
const LogoNodejs = require("./interface/Logo_nodejs");
const Org = require("./interface/Org");
const GetOrgId = require("./interface/GetOrgId");
const Os = require("./interface/Os");
const Deth = require("./interface/Deth");
const Vote = require("./interface/Vote");
const AppStore = require("./interface/AppStore");
const CheckVote = require("./interface/CheckVote");
const Application = require('./interface/Application');
const Daoinfo = require("./interface/Daoinfo");
const Version = require("./interface/Version");
const EventSum = require("./interface/EventSum");
const Getinfo = require("./interface/Getinfo");
const ChangeSVG= require("./interface/ChangeSVG");
const Allapp= require("./interface/Allapp");
const DaoAddress=require('./data/address');

class DaoApi {
    unsub() {
        this.os.unsub(); this.logo.unsub(); this.org.unsub(); this.tokens.unsub(); this.iadd.unsub(); this.utoken.unsub();this.eventSum.unsub();this.allapp.unsub();
    }

    get commulate() { if (!this.commulateobj) this.commulateobj = new Commulate(this.web3, this.selectedAccount,DaoAddress[this.net]['commulate']); return this.commulateobj; }
    get iadd() { if (!this.iaddobj) this.iaddobj = new IADD(this.web3, this.selectedAccount,DaoAddress[this.net]['iadd'], this.commulate,this.para); return this.iaddobj; }
    get logo() {
        if (typeof window === 'object') { if (!this.logoobj) this.logoobj = new Logos(this.web3, this.selectedAccount,DaoAddress[this.net]['logo'],this.para); }
        else { if (!this.logoobj) this.logoobj = new LogoNodejs(this.web3, this.selectedAccount,DaoAddress[this.net]['logo'],this.para); }
        return this.logoobj;
    }
    get tokens() { if (!this.tokensobj) this.tokensobj = new Tokens(this.web3, this.selectedAccount,DaoAddress[this.net]['token'],this.para); return this.tokensobj; }
    get utoken() { if (!this.utokenobj) this.utokenobj = new Utoken(this.web3, this.selectedAccount,DaoAddress[this.net]['utoken'],this.para); return this.utokenobj; }
    get ethToToken() { if (!this.ethToTokenobj) this.ethToTokenobj = new EthToToken(this.web3, this.selectedAccount,DaoAddress[this.net]['ethToToken'], this.utoken, this.commulate); return this.ethToTokenobj; }
    get org() { if (!this.orgobj) this.orgobj = new Org(this.web3, this.selectedAccount,DaoAddress[this.net]['org'],this.para); return this.orgobj; }
    get getOrgId() { if (!this.getOrgIdobj) this.getOrgIdobj = new GetOrgId(this.web3, this.selectedAccount,DaoAddress[this.net]['getOrgId']); return this.getOrgIdobj; }
    get os() { if (!this.osobj) this.osobj = new Os(this.web3, this.selectedAccount,DaoAddress[this.net]['os'], this.getOrgId,this.para); return this.osobj; }
    get deth() { if (!this.dethobj) this.dethobj = new Deth(this.web3, this.selectedAccount,DaoAddress[this.net]['deth']); return this.dethobj; }
    get vote() { if (!this.voteobj) this.voteobj = new Vote(this.web3, this.selectedAccount,DaoAddress[this.net]['vote']); return this.voteobj; }
    get checkVote() { if (!this.checkVoteobj) this.checkVoteobj = new CheckVote(this.web3, this.selectedAccount,DaoAddress[this.net]['checkVote']); return this.checkVoteobj; }
    get application() { if (!this.applicationobj) this.applicationobj = new Application(this.web3, this.selectedAccount,DaoAddress[this.net]['application']); return this.applicationobj; }
    get daoinfo() { if (!this.daoinfoobj) this.daoinfoobj = new Daoinfo(this.web3, this.selectedAccount,DaoAddress[this.net]['daoInfo'],DaoAddress[this.net]['viewCall']); return this.daoinfoobj; }
    get appVersion() { if (!this.versionobj) this.versionobj = new Version(this.web3, this.selectedAccount,DaoAddress[this.net]['version']); return this.versionobj; }
    get eventSum() { if (!this.eventsumobj) this.eventsumobj = new EventSum(this.web3, this.selectedAccount,DaoAddress[this.net]['eventSum'],this.para); return this.eventsumobj; }
    get getInfo() { if (!this.getinfoobj) this.getinfoobj = new Getinfo(this.web3, this.selectedAccount,DaoAddress[this.net]['getInfo']); return this.getinfoobj; }
    get changesvg() { if (!this.changesvgobj) this.changesvgobj = new ChangeSVG(this.web3, this.selectedAccount,DaoAddress[this.net]['changeSVG']); return this.changesvgobj; }
    get allapp() { if (!this.allappobj) this.allappobj = new Allapp(this.web3, this.selectedAccount,DaoAddress[this.net]['allapp']); return this.allappobj; }
    get appstore() { if (!this.appstoreobj) this.appstoreobj = new AppStore(this.web3, this.selectedAccount,DaoAddress[this.net]['appstore']); return this.appstoreobj; }

    get version(){return '1.0.14';}


  

    constructor(_web3, _selectAccount,_net,_para) {
        this.web3 = _web3;
        this.selectedAccount = _selectAccount;
        this.net=_net;
        this.para=_para;

        this.commulateobj = null;
        this.iaddobj = null;
        this.logoobj = null;
        this.tokensobj = null;
        this.utokenobj = null;
        this.ethToTokenobj = null;
        this.getOrgIdobj = null;
        this.orgobj = null;
        this.osobj = null;
        this.dethobj = null;
        this.voteobj = null;
        this.checkVoteobj = null;
        this.applicationobj = null;
        this.daoinfoobj = null;
        this.versionobj = null;
        this.eventsumobj=null;
        this.getinfoobj=null;
        this.changesvgobj=null;
        this.allappobj=null;
        this.appstoreobj=null;


        // this.commulate = new Commulate(this.web3, this.selectedAccount);
        // this.iadd = new IADD(this.web3, this.selectedAccount,this.commulate);
        // this.register = new Register(this.web3, this.selectedAccount);

        // if(typeof window==='object') {
        //     this.logo = new Logos(this.web3, this.selectedAccount); 
        // }
        // else 
        // {
        //     this.logo = new LogoNodejs(this.web3, this.selectedAccount);
        // }

        // this.tokens = new Tokens(this.web3, this.selectedAccount);
        // this.utoken = new Utoken(this.web3, this.selectedAccount);
        // this.ethToToken = new EthToToken(this.web3, this.selectedAccount, this.utoken, this.commulate);
        // this.getOrgId = new GetOrgId(this.web3, this.selectedAccount);

        // this.org = new Org(this.web3, this.selectedAccount);
        // this.os = new Os(this.web3, this.selectedAccount,this.getOrgId);
        // this.deth = new Deth(this.web3, this.selectedAccount);
        // this.vote = new Vote(this.web3, this.selectedAccount);



    }


}


if (typeof window === 'object') {
    window.Daoapi = function (_web3, _selectAccount,_net,_para) {
        return new DaoApi(_web3, _selectAccount,_net,_para)
    }

    window.Daoapi.default = window.Daoapi;
}

module.exports = DaoApi