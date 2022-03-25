
class Daoinfo
{
    
    async  viewcallGetAddress(_address,_index) {    
        if(!this.viewcallContract)  this.viewcallContract=new this.web3.eth.Contract(this.abi,this.viewCallAddress , {from: this.selectedAccount});   
        let result = await this.viewcallContract.methods.getAddress(_address,_index).call({from: this.selectedAccount});
        return result;
   }

   async  getAddress(_address,_index) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.getAddress(_address,_index).call({from: this.selectedAccount});
    return result;
}

async  viewcallIndexToInfoK(_address,_index) {    
    if(!this.viewcallContract)  this.viewcallContract=new this.web3.eth.Contract(this.abi,this.viewCallAddress , {from: this.selectedAccount});   
    let result = await this.viewcallContract.methods.indexToInfoK(_address,_index).call({from: this.selectedAccount});
    return result;
}


async  viewcallInfosK(_address,_index) {    
    if(!this.viewcallContract)  this.viewcallContract=new this.web3.eth.Contract(this.abi,this.viewCallAddress , {from: this.selectedAccount});   
    let result = await this.viewcallContract.methods.infosK(_address,_index).call({from: this.selectedAccount});
    return result;
}

   async  indexToInfoK(_address,_index) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.indexToInfoK(_address,_index).call({from: this.selectedAccount});
    return result;
}

async  infosK(_address,_index) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.infosK(_address,_index).call({from: this.selectedAccount});
    return result;
}
   

 

    constructor(_web3,_selectAccount,_address,_viewAddress) {
        this.web3=_web3;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
        this.viewcallContract=undefined;    
        this.viewCallAddress=_viewAddress;
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
                        "name": "_daoNumber",
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
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
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
                        "internalType": "uint256",
                        "name": "appNumber",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "infosIndex",
                        "type": "uint256"
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
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    }
                ],
                "name": "Recover",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "newApp",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
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
                        "internalType": "address",
                        "name": "_install",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "SetStatus",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    }
                ],
                "name": "UnInstall",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
                    }
                ],
                "name": "Update",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_del",
                        "type": "address"
                    }
                ],
                "name": "delToIndexK",
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
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
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
                        "internalType": "address",
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "callTo",
                        "type": "address"
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
                        "internalType": "address",
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    }
                ],
                "name": "getAddress",
                "outputs": [
                    {
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    },
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
                        "internalType": "address",
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "indexToInfoK",
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
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_num",
                        "type": "uint256"
                    }
                ],
                "name": "infosK",
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
                                "internalType": "uint8",
                                "name": "status",
                                "type": "uint8"
                            },
                            {
                                "internalType": "address",
                                "name": "vote",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct DaoInfo.info",
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
                        "internalType": "uint32",
                        "name": "_daoNumber",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "_root",
                        "type": "address"
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
                        "internalType": "address[]",
                        "name": "targets",
                        "type": "address[]"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
                    },
                    {
                        "internalType": "address",
                        "name": "callTo",
                        "type": "address"
                    }
                ],
                "name": "initFunction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes",
                        "name": "appData",
                        "type": "bytes"
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
                        "internalType": "address",
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "appAddress",
                        "type": "address"
                    }
                ],
                "name": "isApp",
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
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_num",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    }
                ],
                "name": "isInit",
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
                        "name": "_self",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
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
                "inputs": [
                    {
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    }
                ],
                "name": "recover",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "appData",
                        "type": "bytes"
                    }
                ],
                "name": "replace",
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
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    }
                ],
                "name": "uninstall",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint16",
                        "name": "version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint256",
                        "name": "appIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "versionApp",
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
module.exports=Daoinfo
