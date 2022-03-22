const daolog = require("../utils");
class AppStore
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
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_global",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_manager",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_allApps",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_payModule",
                        "type": "address"
                    },
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
                        "name": "_constitute",
                        "type": "address[]"
                    }
                ],
                "name": "addApp",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "chageIsOs",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "changeIsPayModule",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "appNumber",
                        "type": "uint256"
                    }
                ],
                "name": "getAppInfo",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "payModule",
                                "type": "address"
                            },
                            {
                                "internalType": "uint16",
                                "name": "version",
                                "type": "uint16"
                            }
                        ],
                        "internalType": "struct appStore.info",
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
                        "name": "appNumber",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "address",
                        "name": "daoInfo",
                        "type": "address"
                    }
                ],
                "name": "getInfo",
                "outputs": [
                    {
                        "internalType": "bytes",
                        "name": "",
                        "type": "bytes"
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
                "inputs": [],
                "name": "isOs",
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
                "name": "isPayModule",
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
                "name": "manager",
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
                        "name": "_constitute",
                        "type": "address[]"
                    }
                ],
                "name": "updateApp",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "versionThis",
                "outputs": [
                    {
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}

module.exports=AppStore