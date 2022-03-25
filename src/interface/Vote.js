
class Vote
{
  
    async  addPro(_proName,_address1,_addressapp,_address2,_daoId,_status,_data,_voteaddress) {    
       // if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
       let _voteContract=new this.web3.eth.Contract(this.abi,_voteaddress , {from: this.selectedAccount});   
        let result = await _voteContract.methods.addPro([_proName,_address1,_addressapp,_address2,_daoId,_status,_data]).send({from: this.selectedAccount});
        return result;
   }

   
   async  voteTo(_proId,_voteaddress) {    
   // if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
   let _voteContract=new this.web3.eth.Contract(this.abi,_voteaddress , {from: this.selectedAccount});   
    let result = await _voteContract.methods.voteTo(_proId).send({from: this.selectedAccount});
    return result;
}

async getPro(_index,_voteaddress) {
    let _voteContract=new this.web3.eth.Contract(this.abi,_voteaddress , {from: this.selectedAccount});   
    let result= await _voteContract.methods.getPro(_index).call({from: this.selectedAccount});
    return result;
}



 
async  exec(_proId,_voteaddress) {    
    //if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let _voteContract=new this.web3.eth.Contract(this.abi,_voteaddress , {from: this.selectedAccount});   
    let result = await _voteContract.methods.exec(_proId).send({from: this.selectedAccount,gas:2300000 });
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
        this.checkVoteObj=undefined;
        this.applicationObj=undefined;
        this.daoinfoObj=undefined;
        this.versionObj=undefined;
        this.address=_address;
  
        this.abi=[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_deth",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_eventSum",
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
                        "internalType": "uint256",
                        "name": "index",
                        "type": "uint256"
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
                "inputs": [],
                "name": "DETH",
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
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "address",
                                "name": "component",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "app",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "cause",
                                "type": "address"
                            },
                            {
                                "internalType": "uint32",
                                "name": "daoId",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "internalType": "bytes",
                                "name": "data",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct vote.pro",
                        "name": "_pro",
                        "type": "tuple"
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
                        "internalType": "address",
                        "name": "_new",
                        "type": "address"
                    }
                ],
                "name": "changeRule",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "eventSum",
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
                        "name": "_index",
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
                        "internalType": "uint256",
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "getPro",
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
                                "name": "component",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "app",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "cause",
                                "type": "address"
                            },
                            {
                                "internalType": "uint32",
                                "name": "daoId",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bool",
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "internalType": "bytes",
                                "name": "data",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct vote.pro",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTo",
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
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "getVote",
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
                        "internalType": "address",
                        "name": "_org",
                        "type": "address"
                    },
                    {
                        "internalType": "uint16[]",
                        "name": "_need",
                        "type": "uint16[]"
                    },
                    {
                        "internalType": "address",
                        "name": "_version",
                        "type": "address"
                    }
                ],
                "name": "initVote",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "isExec",
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
                        "name": "_need",
                        "type": "uint16"
                    }
                ],
                "name": "isOver",
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
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "need",
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
                "inputs": [],
                "name": "nextPro",
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
                "name": "nowPro",
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
                "name": "org",
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
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_votes",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "setVotes",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_index",
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

module.exports=Vote