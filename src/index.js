'use strict';
const Commulate = require("./interface/Commulate");
const EthToToken = require("./interface/EthToToken");
const IADD = require("./interface/IADD");
const Logos = require("./interface/Logo");
const Register = require("./interface/Register");
const Tokens = require("./interface/Tokens");
const Utoken = require("./interface/Utoken");
const LogoNodejs = require("./interface/Logo_nodejs");
const Org=require("./interface/Org");
const GetOrgId=require("./interface/GetOrgId");
const Os=require("./interface/Os");
const Deth=require("./interface/Deth");
const Vote=require("./interface/Vote");

 class DaoApi {

    unsub()
    {
        this.os.unsub();
        this.logo.unsub();
        this.org.unsub();
        this.tokens.unsub();
        this.iadd.unsub();
        this.utoken.unsub();
    }

    toWei(v) {
        let a = v.toString();
        let _a = a.split('.');
        if (_a.length == 1) {
            for (let i = 0; i < 18; i++) {
                a += '0';
            }

        }
        else {

            a = _a[0].toString() + '' + _a[1].toString();

            let _b = _a[1].length;
            for (let i = 0; i < 18 - _b; i++) {
                a += '0'
            }

        }
        return a;
    }
    
    fromWei(v) {
        if (typeof v == 'string') {
            let _a = v.split('').reverse();
            let _b = _a.length
            if (_a.length < 18) {
                for (let i = 0; i < 18 - _b; i++) {
                    _a.push('0');
                }
            }
            _a.splice(18, 0, ".")
            if (_a[_a.length - 1] == '.') {
                _a.push('0')
            }
            let _c = _a.reverse().join('');
            return _c;
        }
        else console.error(v + " not string !")
    }

    constructor(_web3, _selectAccount) {
        this.version='1.0.11';
        this.web3 = _web3;
        this.selectedAccount = _selectAccount;
        this.commulate = new Commulate(this.web3, this.selectedAccount);
        this.iadd = new IADD(this.web3, this.selectedAccount,this.commulate);
        this.register = new Register(this.web3, this.selectedAccount);

        if(typeof window==='object') {
            this.logo = new Logos(this.web3, this.selectedAccount); 
        }
        else 
        {
            this.logo = new LogoNodejs(this.web3, this.selectedAccount);
        }
        
        this.tokens = new Tokens(this.web3, this.selectedAccount);
        this.utoken = new Utoken(this.web3, this.selectedAccount);
        this.ethToToken = new EthToToken(this.web3, this.selectedAccount, this.utoken, this.commulate);
        this.getOrgId = new GetOrgId(this.web3, this.selectedAccount);

        this.org = new Org(this.web3, this.selectedAccount);
        this.os = new Os(this.web3, this.selectedAccount,this.getOrgId);
        this.deth = new Deth(this.web3, this.selectedAccount);
        this.vote = new Vote(this.web3, this.selectedAccount);



    }


}


if(typeof window==='object') {
    window.Daoapi=function(_web3, _selectAccount){
        return new DaoApi(_web3, _selectAccount)
    }
  
    window.Daoapi.default= window.Daoapi;
}

module.exports=DaoApi