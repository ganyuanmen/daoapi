const daolog = require("../utils");
class Org
{
   
    async  newOrg(_name,_address,_vote,_need) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
       
        let result = await this.contract.methods['newOrg((string,address[],uint256[],uint16[]))']([_name,_address, _vote, _need]).send({from: this.selectedAccount});
        return result;
   }

   async  getOrg(org_id) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.getOrg(org_id).call({from: this.selectedAccount});
    return result;
}


async  getInitData(org_id) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});   
    let result = await this.contract.methods.getInitData(org_id).call({from: this.selectedAccount});
    return result;
}


   orgCreateEvent(maxBlockNumber,callbackFun) {
    const _this = this;
    if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
    
    this.eventObj=this.contract.events.CreateOrg({
        filter: {}, 
        fromBlock: maxBlockNumber+1,
    }, function (_error, data) {
        if(!data || !data.returnValues) {
            daolog.log("orgCreateEvent error");
            if(this.para) this.para.isError=true;
            return;
        }
        _this.web3.eth.getTransactionReceipt(data.transactionHash).then(eobj=>{
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "id": data.returnValues.id,
                    "name": data.returnValues.name,
                    "org_manager":eobj.from,
                    "vote_address":data.returnValues.vote_del
                },
                "event": "orgCreateEvent"})
        })

       
    })
   
}
unsub()
{
    try{
        if(this.eventObj && this.eventObj.unsubscribe)
        {
            this.eventObj.unsubscribe();
        }
        this.eventObj=null;
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
        this.eventObj=undefined;
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
                        "name": "_deth",
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
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "vote_del",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "CreateOrg",
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
                        "internalType": "address",
                        "name": "_deth",
                        "type": "address"
                    }
                ],
                "name": "changeDETH",
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
                "name": "databaseToID",
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
                        "name": "_index",
                        "type": "uint32"
                    }
                ],
                "name": "getInitData",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "initMem",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "initNum",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint16[]",
                                "name": "need",
                                "type": "uint16[]"
                            }
                        ],
                        "internalType": "struct RegisterOrg.initData",
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
                        "name": "_index",
                        "type": "uint32"
                    }
                ],
                "name": "getOrg",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "orgDel",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "voteDel",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct org",
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
                        "internalType": "address",
                        "name": "_orgVer",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_voteVer",
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
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "nameToId",
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
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "address[]",
                                "name": "initMem",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "initNum",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint16[]",
                                "name": "need",
                                "type": "uint16[]"
                            }
                        ],
                        "internalType": "struct RegisterOrg.initData",
                        "name": "_initData",
                        "type": "tuple"
                    }
                ],
                "name": "newOrg",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "orgDel",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "voteDel",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct org",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_index",
                        "type": "uint32"
                    }
                ],
                "name": "newOrg",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "orgDel",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "voteDel",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct org",
                        "name": "_sd",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "nonpayable",
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
                                "internalType": "address[]",
                                "name": "initMem",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "initNum",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "uint16[]",
                                "name": "need",
                                "type": "uint16[]"
                            }
                        ],
                        "internalType": "struct RegisterOrg.initData",
                        "name": "_initData",
                        "type": "tuple"
                    }
                ],
                "name": "newOrgInfo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nextOrg",
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
                "inputs": [],
                "name": "nextVer",
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
                "name": "orgVesrion",
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
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "voteToID",
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
                "inputs": [],
                "name": "voteVersion",
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

module.exports=Org