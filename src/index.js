
import Commulate from "./interface/Commulate";
import EthToToken from "./interface/EthToToken";
import IADD from "./interface/IADD";
import Logos from "./interface/Logo";
import Register from "./interface/Register";
import Tokens from "./interface/Tokens";
import Utoken from "./interface/Utoken";
import LogoNodejs from "./interface/Logo_nodejs";

export default class daoApi {

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
        this.web3 = _web3;
        this.selectedAccount = _selectAccount;
            this.commulate = new Commulate(this.web3, this.selectedAccount);
            this.iadd = new IADD(this.web3, this.selectedAccount,this.commulate);
            this.register = new Register(this.web3, this.selectedAccount);
            
            if(window && window.document)
            this.logo = new Logos(this.web3, this.selectedAccount);
            else 
            this.logo = new LogoNodejs(this.web3, this.selectedAccount);

            this.tokens = new Tokens(this.web3, this.selectedAccount);
            this.utoken = new Utoken(this.web3, this.selectedAccount);
            this.ethToToken = new EthToToken(this.web3, this.selectedAccount, this.utoken, this.commulate);


    }


}
