
class AppStore
{

   //添加app
    async  addApp(_ad,_name,_desc,_adar) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result = await this.contract.methods.addApp(_ad,_name,_desc,_adar).send({from: this.selectedAccount});
        return result;
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
    this.address=_address;
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