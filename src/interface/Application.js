const daolog =require('../utils')

class Application
{
   
    unsub()
    {
        try{
            if(this.installobj && this.installobj.unsubscribe)
            {
                this.installobj.unsubscribe();
            }
            if(this.updateobj && this.updateobj.unsubscribe)
            {
                this.updateobj.unsubscribe();
            }
            if(this.replaceobj && this.replaceobj.unsubscribe)
            {
                this.replaceobj.unsubscribe();
            }
            this.installobj=null;
            this.updateobj=null;
            this.replaceobj=null;
        }
        catch(e){
            console.error(e);
        }
    }

    installEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.installobj=this.contract.events.Install({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
            if(!data || !data.returnValues) {
                daolog.log("installEvent error");
                return;
            }
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "daoId": data.returnValues.daoNumber,
                    "appsetId":data.returnValues._number,
                    "appsetVersion":data.returnValues._version,
                    "votedelAddress":data.returnValues.del
                },
                "event": "installEvent"})
        })
    }

    updateEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.updateobj=this.contract.events.Update({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
            if(!data || !data.returnValues) {
                daolog.log("updateEvent error");
                return;
            }
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "daoId": data.returnValues.daoNumber,
                    "appsetId":data.returnValues._number,
                    "appsetVersion":data.returnValues._version
                },
                "event": "updateEvent"})
        })
    }

    replaceEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.replaceobj=this.contract.events.Replace({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
            if(!data || !data.returnValues) {
                daolog.log("replaceEvent error");
                return;
            }
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "daoId": data.returnValues.daoNumber,
                    "appsetId":data.returnValues._number,
                    "appsetVersion":data.returnValues._version
                },
                "event": "replaceEvent"})
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

    constructor(_web3,_selectAccount,_address) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.installobj=undefined;
        this.updateobj=undefined;
        this.replaceobj=undefined;
        this.address=_address;
 
        this.abi=[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_register",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_global",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_appStore",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_allApp",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_version",
                        "type": "uint256"
                    }
                ],
                "name": "Init",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_version",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "del",
                        "type": "address"
                    }
                ],
                "name": "Install",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "old",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_version",
                        "type": "uint256"
                    }
                ],
                "name": "Replace",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "SetVote",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_version",
                        "type": "uint256"
                    }
                ],
                "name": "Update",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_one",
                        "type": "uint256"
                    }
                ],
                "name": "changeOne",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_register",
                        "type": "address"
                    }
                ],
                "name": "changeRe",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
                    }
                ],
                "name": "init",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
                    },
                    {
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    }
                ],
                "name": "initByRegister",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                "name": "install",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint64",
                        "name": "_number",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint32",
                        "name": "_version",
                        "type": "uint32"
                    }
                ],
                "name": "install",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
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
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    }
                ],
                "name": "installByRegister",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
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
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
                    },
                    {
                        "internalType": "address",
                        "name": "_vote",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_out",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "installInOne",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "isapp",
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
                "name": "one",
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
                "name": "register",
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
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_appIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    }
                ],
                "name": "repalce",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                        "internalType": "address",
                        "name": "_out",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "setTo",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_out",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "setToByRegister",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
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
                        "internalType": "address",
                        "name": "_vote",
                        "type": "address"
                    }
                ],
                "name": "setVote",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "_vote",
                        "type": "address"
                    }
                ],
                "name": "setVoteByRegister",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "sk",
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
                "name": "update",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    }
}

module.exports=Application