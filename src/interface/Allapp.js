const daolog = require("../utils");
class Allapp
{
   //添加app
    async  addApp(_name,_desc,_to) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result = await this.contract.methods.addApp(_name,_desc,_to).send({from: this.selectedAccount});
        return result;
   }

  //更新app
  async  addVersion(_name,_desc,_to) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
    let result = await this.contract.methods.addVersion(_name,_desc,_to).send({from: this.selectedAccount});
    return result;
}


async  getAppInfo(_id) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.getAppInfo(_id).call({from: this.selectedAccount});
    return result;
}


async  getVersionInfo(_id,_ver) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.getVersionInfo(_id,_ver).call({from: this.selectedAccount});
    return result;
}

addAppEvent(maxBlockNumber,callbackFun) {
    const _this = this;
    if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
    
    this.addappObj=this.contract.events.AddApp({
        filter: {}, 
        fromBlock: maxBlockNumber+1,
    }, function (_error, data) {
       // console.log(data);
        if(!data || !data.returnValues) {
            daolog.log("addAppEvent error");
            if(this.para) this.para.isError=true;
            return;
        }
        _this.web3.eth.getTransactionReceipt(data.transactionHash).then(eobj=>{
            _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "indexRec": data.returnValues.indexRec,
                    "name": data.returnValues.name,
                    "index":data.returnValues.index,
                    "address":eobj.from,
                    "time":ee.timestamp
                },
                "event": "addAppEvent"})       
    })
})
})
   
}


addVersionEvent(maxBlockNumber,callbackFun) {
    const _this = this;
    if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
    
    this.addversionObj=this.contract.events.AddVersion({
        filter: {}, 
        fromBlock: maxBlockNumber+1,
    }, function (_error, data) {
       // console.log(data);
        if(!data || !data.returnValues) {
            daolog.log("addVersionEvent error");
            if(this.para) this.para.isError=true;
            return;
        }
             _this.web3.eth.getTransactionReceipt(data.transactionHash).then(eobj=>{
               _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "appNum": data.returnValues.appNum,
                    "rec": data.returnValues.rec,
                    "version":data.returnValues.version,
                    "address":eobj.from,
                    "time":ee.timestamp
                },
                "event": "addVersionEvent"})       
    })
})
})
   
}

unsub()
{
    try{
        if(this.addappObj && this.addappObj.unsubscribe)
        {
            this.addappObj.unsubscribe();
        }
        this.addappObj=null;

        if(this.addversionObj && this.addversionObj.unsubscribe)
        {
            this.addversionObj.unsubscribe();
        }
        this.addversionObj=null;

    }
    catch(e){
        console.log(e);
    }
}
setAddress(_address)
{
    this.address=_address;
}
setAbi(_abi)
{
    this.abi=_abi;
}


    constructor(_web3,_selectAccount,_address,_para) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.maxOrg=0;
        this.para=_para;
        this.addappObj=undefined;
        this.addeventObj=undefined;
        this.address=_address;
      //  console.log("----Org-------->"+this.address);
        this.abi=[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "indexRec",
                        "type": "uint256"
                    }
                ],
                "name": "AddApp",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_appStore",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "indexRec",
                        "type": "uint256"
                    }
                ],
                "name": "AddSet",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "_appStore",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "appNum",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "rec",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "version",
                        "type": "uint256"
                    }
                ],
                "name": "AddSetVersion",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "appNum",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "rec",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "version",
                        "type": "uint256"
                    }
                ],
                "name": "AddVersion",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "manager",
                        "type": "address"
                    }
                ],
                "name": "ChangeManager",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_store",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "SetStore",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    }
                ],
                "name": "addApp",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desc",
                        "type": "string"
                    },
                    {
                        "internalType": "address[]",
                        "name": "appAddress",
                        "type": "address[]"
                    }
                ],
                "name": "addSet",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desc",
                        "type": "string"
                    },
                    {
                        "internalType": "address[]",
                        "name": "appAddress",
                        "type": "address[]"
                    }
                ],
                "name": "addSetVersion",
                "outputs": [
                    {
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "desc",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    }
                ],
                "name": "addVersion",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_manager",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "changeManager",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_num",
                        "type": "uint256"
                    }
                ],
                "name": "getAppInfo",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "manager",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "desc",
                                "type": "string"
                            },
                            {
                                "internalType": "uint16",
                                "name": "versions",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "infos",
                                "type": "uint256[]"
                            }
                        ],
                        "internalType": "struct AllApps.appVersion",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    }
                ],
                "name": "getAppSet",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "desc",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "apps",
                                "type": "address[]"
                            }
                        ],
                        "internalType": "struct AllApps.appSetRe",
                        "name": "re",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    }
                ],
                "name": "getVersion",
                "outputs": [
                    {
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_num",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_versionNum",
                        "type": "uint16"
                    }
                ],
                "name": "getVersionInfo",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "desc",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct AllApps.appInfo",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "index",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "indexOfSet",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_app",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_set",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    }
                ],
                "name": "isInSet",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "isStore",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextAppInfos",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextApps",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextSet",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextSetIndex",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_store",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "setStore",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    }
}

module.exports=Allapp