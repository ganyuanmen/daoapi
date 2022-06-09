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
// const Os = require("./interface/Os");
 const Dao_deth = require("./interface/Dao_deth");
 const Dao_value = require("./interface/Dao_value");
// const AppStore = require("./interface/AppStore");
// const CheckVote = require("./interface/CheckVote");
// const Application = require('./interface/Application');
// const Daoinfo = require("./interface/Daoinfo");
// const Version = require("./interface/Version");
// const EventSum = require("./interface/EventSum");
 const Dao_appInfo = require("./interface/Dao_appInfo");
// const ChangeSVG= require("./interface/ChangeSVG");
// const Allapp= require("./interface/Allapp");


class DaoApi {
  
    get dao_commulate() { if (!this.dao_commulate_obj) this.dao_commulate_obj = new Dao_commulate(this.ether,this.etherProvider, this.selectedAccount); return this.dao_commulate_obj; }
    get dao_iadd() { if (!this.dao_iadd_obj) this.dao_iadd_obj = new Dao_iadd(this.ether,this.etherProvider, this.selectedAccount, this.dao_commulate); return this.dao_iadd_obj; }
    get dao_logo() {if (!this.dao_logo_obj) this.dao_logo_obj = new Dao_logo(this.ether,this.etherProvider,this.selectedAccount); return this.dao_logo_obj;}
    get dao_erc20s() { if (!this.dao_erc20s_obj) this.dao_erc20s_obj = new Dao_erc20s(this.ether,this.etherProvider, this.selectedAccount); return this.dao_erc20s_obj; }
    get dao_uToken() { if (!this.dao_uToken_obj) this.dao_uToken_obj = new Dao_uToken(this.ether,this.etherProvider, this.selectedAccounta); return this.dao_uToken_obj; }
    get dao_ethToken() { if (!this.dao_ethToken_obj) this.dao_ethToken_obj = new Dao_ethToken(this.ether,this.etherProvider, this.selectedAccount, this.dao_uToken, this.dao_commulate); return this.dao_ethToken_obj; }
    get dao_org() { if (!this.dao_org_obj) this.dao_org_obj = new Dao_org(this.ether,this.etherProvider, this.selectedAccount,this.dao_value); return this.dao_org_obj; }
    get dao_app() { if (!this.dao_app_obj) this.dao_app_obj = new Dao_app(this.ether,this.etherProvider, this.selectedAccount); return this.dao_app_obj; }
    get dao_deth() { if (!this.dao_deth_obj) this.dao_deth_obj = new Dao_deth(this.ether,this.etherProvider, this.selectedAccount); return this.dao_deth_obj; }
    get dao_value() { if (!this.dao_value_obj) this.dao_value_obj = new Dao_value(this.ether,this.etherProvider, this.selectedAccount); return this.dao_value_obj; }
    get dao_register() { if (!this.dao_register_obj) this.dao_register_obj = new Dao_register(this.ether,this.etherProvider, this.selectedAccount); return this.dao_register_obj; }
    get dao_appInfo() { if (!this.dao_appInfo_obj) this.dao_appInfo_obj = new Dao_appInfo(this.ether,this.etherProvider, this.selectedAccount); return this.dao_appInfo_obj; }
  
    get version(){return '1.0.15';}


    constructor(_ether,_etherProvider, _selectAccount) {
        this.ether=_ether;
        this.etherProvider = _etherProvider;
        this.selectedAccount = _selectAccount;
       
       
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

    
 str2UTF8(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}

 Bytes2HexString(arrBytes) {
    var str = "";
    for (var i = 0; i < arrBytes.length; i++) {
      var tmp;
      var num=arrBytes[i];
      if (num < 0) {
      //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
        tmp =(255+num+1).toString(16);
      } else {
        tmp = num.toString(16);
      }
      if (tmp.length == 1) {
        tmp = "0" + tmp;
      }
      str += tmp;
    }
    return str;
  }

  typedData(_chainId,_index,_proHash){
      return {
        types: {
          EIP712Domain: [
            {name: "name", type: "string"},
            {name: "version", type: "string"},
            {name: "chainId", type: "uint256"},
            {name: "verifyingContract", type: "address"},
          ],
          Permit: [
            {name: "index", type: "uint16"},
            {name: "owner", type: "address"}, 
            {name: "_hash", type: "bytes32"},  
            {name: "deadline", type: "uint"}
          ]
        },
        primaryType: 'Permit',
        domain: {
          name: 'org',
          version: '1',
          chainId: _chainId,
          verifyingContract: this.dao_org.address
        },
        message: {
          'index': _index,
          'owner': this.selectedAccount,
          '_hash': _proHash,
          'deadline':'1000000000000000'
        }
      }
    }


singerType() {
 
  return  {Permit: [{name: "index", type: "uint16"},{name: "owner", type: "address"}, 
  {name: "_hash", type: "bytes32"}, {name: "deadline", type: "uint"}]}

}

}

if (typeof window === 'object') {
    window.Daoapi = function (_ether,_etherProvider, _selectAccount) {
        return new DaoApi(_ether,_etherProvider, _selectAccount)
    }

    window.Daoapi.default = window.Daoapi;
}

module.exports = DaoApi