const daolog = require("../utils");

class EventSum
{
   
    unsub()
    {
        try{
            if(this.addProobj && this.addProobj.unsubscribe)
            {
                this.addProobj.unsubscribe();
            }
            if(this.execobj && this.execobj.unsubscribe)
            {
                this.execobj.unsubscribe();
            }
            if(this.voteToobj && this.voteToobj.unsubscribe)
            {
                this.voteToobj.unsubscribe();
            }
            this.addProobj=null;
            this.execobj=null;
            this.voteToobj=null;
        }
        catch(e){
            console.error(e);
        }
    }

    addProEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.addProobj=this.contract.events.AddPro({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
          
            if(!data || !data.returnValues) {
                daolog.log("addProEvent error");
                if(this.para) this.para.isError=true;
                return;
            }
          //  _this.web3.eth.getTransactionReceipt(data.transactionHash).then(eobj=>{
           //     _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
                    callbackFun.call(null,{                  
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "transactionHash": data.transactionHash,
                        "transactionIndex":data.transactionIndex,
                        "data": {
                            "proIndex": data.returnValues.index,
                            "voteDel":data.returnValues.voteDel,
                            "address":data.returnValues._msg,
                            "time":data.returnValues.time,
                            "daoId":data.returnValues.daoId,
                            "name":data.returnValues.name,
                            
                        },
                        "event": "addProEvent"})
             //    })
           // })
        })
    }

    execEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.execobj=this.contract.events.Exec({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
        
            if(!data || !data.returnValues) {
                daolog.log("execEvent error");
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
                    "proIndex": data.returnValues.index,
                    "voteDel":data.returnValues.voteDel,
                    "address":(eobj && eobj.from)?eobj.from:'',
                    "time":(ee && ee.timestamp)?ee.timestamp:(new Date().getTime()+'').substring(0,10)
                },
                "event": "execEvent"})
            })
        })
        })
    }

    voteToEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.voteToobj=this.contract.events.VoteTo({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
          
            if(!data || !data.returnValues) {
                daolog.log("voteToEvent error");
                if(this.para) this.para.isError=true;
                return;
            }
         
                _this.web3.eth.getBlock(data.blockNumber).then(ee=>{

            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "voter": data.returnValues.voter,
                    "proIndex":data.returnValues.index,
                    "voteDel":data.returnValues.voteDel,
                    "power":data.returnValues.power,
                    "time":ee.timestamp
                },
                "event": "voteToEvent"})
            })
        
        })
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
        this.addProobj=undefined;
        this.execobj=undefined;
        this.voteToobj=undefined;
        this.address=_address;
        this.para=_para;

        this.abi=[
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "voteDel",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint32",
                        "name": "daoId",
                        "type": "uint32"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint64",
                        "name": "time",
                        "type": "uint64"
                    }
                ],
                "name": "AddPro",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "voteDel",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "Exec",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "voteDel",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "power",
                        "type": "uint256"
                    }
                ],
                "name": "VoteTo",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint32",
                        "name": "daoId",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "addPro",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "exec",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "power",
                        "type": "uint256"
                    }
                ],
                "name": "voteTo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    }
}

module.exports=EventSum