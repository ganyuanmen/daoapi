
class Getinfo
{
    async  getOss(_idar) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
        let result = await this.contract.methods.getOss(_idar).call({from: this.selectedAccount});
        return result;
   }

 

    constructor(_web3,_selectAccount,_address) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    

        this.address=_address;
     
        this.abi=[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_registe",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_token",
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
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_from",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_to",
                        "type": "uint256"
                    }
                ],
                "name": "getInfos",
                "outputs": [
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "symbol",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "dsc",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "root",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "os",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "appInfo",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "boot",
                                        "type": "address"
                                    }
                                ],
                                "internalType": "struct state",
                                "name": "daoInfo",
                                "type": "tuple"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint32",
                                "name": "id",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCreate",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct getInfo.states[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_id",
                        "type": "uint32"
                    }
                ],
                "name": "getInfostest",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "symbol",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "dsc",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "root",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "os",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "appInfo",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "boot",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct state",
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
                        "internalType": "uint32[]",
                        "name": "_ids",
                        "type": "uint32[]"
                    }
                ],
                "name": "getOss",
                "outputs": [
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "name",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "symbol",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "dsc",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "root",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "os",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "appInfo",
                                        "type": "address"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "boot",
                                        "type": "address"
                                    }
                                ],
                                "internalType": "struct state",
                                "name": "daoInfo",
                                "type": "tuple"
                            },
                            {
                                "internalType": "uint256",
                                "name": "tokenId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint32",
                                "name": "id",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCreate",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct getInfo.states[]",
                        "name": "returnData",
                        "type": "tuple[]"
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
                "name": "token",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}

module.exports=Getinfo