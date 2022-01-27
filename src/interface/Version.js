
class Version
{
    
    async  getInfo(_daoId,_index) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
        let result = await this.contract.methods.getInfo(_daoId,_index).call({from: this.selectedAccount});
        return result;
   }

 

    constructor(_web3,_selectAccount,_address) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    

        this.address=_address;
      //  console.log("-----Version------->"+this.address);
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
                        "name": "_allApp",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_global",
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
                        "internalType": "uint32",
                        "name": "_number",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "_number",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "daoNumber",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "_number",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "_number",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "name": "Names",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "allApp",
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
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "appNames",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8",
                        "name": "_status",
                        "type": "uint8"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "approveTo",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
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
                        "internalType": "uint32",
                        "name": "_orgNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    }
                ],
                "name": "getAddress",
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    }
                ],
                "name": "getInfo",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "index",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "delegate",
                                "type": "address"
                            },
                            {
                                "internalType": "uint16",
                                "name": "version",
                                "type": "uint16"
                            },
                            {
                                "internalType": "address",
                                "name": "externalCharge",
                                "type": "address"
                            },
                            {
                                "internalType": "bool",
                                "name": "isInit",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct Version.info",
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
                        "internalType": "address",
                        "name": "_del",
                        "type": "address"
                    }
                ],
                "name": "getInfoNum",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint32",
                                "name": "daoNumber",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint32",
                                "name": "nameIndex",
                                "type": "uint32"
                            }
                        ],
                        "internalType": "struct Version.infoNum",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "global",
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
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "initData",
                        "type": "bytes"
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "initData",
                        "type": "bytes"
                    }
                ],
                "name": "initByApprove",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "initData",
                        "type": "bytes"
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
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    }
                ],
                "name": "installByApprove",
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "_indexName",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    }
                ],
                "name": "isViewCall",
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
                        "name": "_external",
                        "type": "address"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    }
                ],
                "name": "setExternal",
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
                        "internalType": "address",
                        "name": "_external",
                        "type": "address"
                    },
                    {
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
                    }
                ],
                "name": "setExternalByRegiter",
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
                    }
                ],
                "name": "setName",
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
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "nameIndex",
                        "type": "uint32"
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

module.exports=Version