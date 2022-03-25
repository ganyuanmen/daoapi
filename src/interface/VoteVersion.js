
class VoteVersion
{
  
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
                        "name": "",
                        "type": "uint32"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "name": "Allow",
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
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "name": "Approve",
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
                        "name": "old",
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
                        "internalType": "uint32",
                        "name": "_nameIndex",
                        "type": "uint32"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "allow",
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
                        "internalType": "uint16",
                        "name": "",
                        "type": "uint16"
                    }
                ],
                "name": "allowTo",
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
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "delNum",
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
                        "internalType": "uint32",
                        "name": "_orgNumber",
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
                        "name": "_orgNumber",
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
                        "name": "_orgNumber",
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
                        "name": "_orgNumber",
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
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    }
                ],
                "name": "isAllow",
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
                "name": "replace",
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
                        "name": "_orgNumber",
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
                "name": "replaceByApprove",
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

module.exports=VoteVersion