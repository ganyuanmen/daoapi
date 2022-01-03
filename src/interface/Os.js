 class Os
{
    async  create(_address,_daoname,_symbol,_dsc,_istoken,_orgid) {
         if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
         let result= await  this.contract.methods['create((address,string,string,string,bool,uint32))']([_address,_daoname,_symbol,_dsc,_istoken,_orgid]).send({from: this.selectedAccount});
         return result;
    }

    async  createOs(_daoname) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await  this.contract.methods.createOs(_daoname).send({from: this.selectedAccount});
        return result;
   }

   unsub()
   {
       try{
        if(this.oseventobj && this.oseventobj.unsubscribe)
        {
            this.oseventobj.unsubscribe();
        }
        if(this.daoeventobj && this.daoeventobj.unsubscribe)
        {
            this.daoeventobj.unsubscribe();
        }
        this.oseventobj=null;
        this.daoeventobj=null;
       }
       catch(e){
           console.log(e);
       }
   }

   async  isIssue(_id) {
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
    let result= await  this.contract.methods.isIssue(_id).call({from: this.selectedAccount});
    return result;
}

   osCreateEvent(maxBlockNumber,callbackFun) {
    const _this = this;
    if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
   
    this.oseventobj=this.contract.events.CreateOs({
        filter: {}, 
        fromBlock:maxBlockNumber+1
    }, function (_error, data) { 
        if(!data || !data.returnValues) {
            _this.p("osCreateEvent error");
            return;
        }
        callbackFun.call(null,{                  
            "address": data.address,
            "blockHash": data.blockHash,
            "blockNumber": data.blockNumber,
            "transactionHash": data.transactionHash,
            "transactionIndex":data.transactionIndex,
            "data": {
                "osAddress": data.returnValues[1],
                "daoId":data.returnValues[0]
            },
            "event": "osCreateEvent"})
        
    })
    }

    p(k)
    {
        var myDate = new Date();
        console.log(myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()+"-->"+k)
    }

    daoCreateEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
      
        this.daoeventobj=this.contract.events.Create({
            filter: {}, 
            fromBlock:maxBlockNumber+1
        }, function (_error, data) { 
            console.log(data);
            if(!data || !data.returnValues) {
                _this.p("daoCreateEvent error");
                return;
            }
            _this.getOrgId.getOrgId(data.returnValues.id).then(e=>{           
                _this.isIssue(data.returnValues.id).then(flak=>{
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "name": data.returnValues._name,
                        "daoTime":data.returnValues[5],
                        "symbol": data.returnValues._symbol,
                        "describe": data.returnValues._dsc,
                        "managerAddress": data.returnValues.manager,
                        "daoId": data.returnValues.id,
                        "isToken":flak,
                        "orgId":e
                    },
                    "event": "daoCreateEvent"})
                });
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

constructor(_web3,_selectAccount,_getOrgId) {
    this.getOrgId=_getOrgId;
    this.web3=_web3;
    this.oseventobj=undefined;
    this.daoeventobj=undefined;
 
    this.selectedAccount=_selectAccount;
    this.contract=undefined;    
  
    this.address='0x472801c8A7B3ab18122d428f5a2CDf303d5A4C26';
    this.abi=[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_manager",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_global",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_ios",
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
                    "indexed": false,
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_dsc",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "manager",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint32",
                    "name": "id",
                    "type": "uint32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Create",
            "type": "event"
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
                    "name": "os",
                    "type": "address"
                }
            ],
            "name": "CreateOs",
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
            "inputs": [],
            "name": "changePay",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "_msg",
                            "type": "address"
                        },
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
                            "internalType": "bool",
                            "name": "issue",
                            "type": "bool"
                        },
                        {
                            "internalType": "uint32",
                            "name": "org",
                            "type": "uint32"
                        }
                    ],
                    "internalType": "struct Register.createInfo",
                    "name": "_info",
                    "type": "tuple"
                }
            ],
            "name": "create",
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
            "name": "createOs",
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
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "daosOf",
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
            "name": "defaultAction",
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
                    "name": "_manager",
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
            "name": "getDaos",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "_names",
                    "type": "string[]"
                },
                {
                    "internalType": "uint32[]",
                    "name": "_ids",
                    "type": "uint32[]"
                },
                {
                    "internalType": "bool[]",
                    "name": "isCreate",
                    "type": "bool[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_manager",
                    "type": "address"
                }
            ],
            "name": "getLength",
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
                    "name": "_id",
                    "type": "uint32"
                }
            ],
            "name": "getName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
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
            "name": "getOss",
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
                    "internalType": "struct Register.state",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "iOsA",
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
                    "name": "_action",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_version",
                    "type": "address"
                }
            ],
            "name": "initOneTime",
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
                }
            ],
            "name": "isIssue",
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
            "name": "isPay",
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
                    "internalType": "uint32",
                    "name": "",
                    "type": "uint32"
                }
            ],
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
            "inputs": [],
            "name": "nextOs",
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
            "name": "payModule",
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
                    "name": "_paymodule",
                    "type": "address"
                }
            ],
            "name": "setPaymodule",
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
            "name": "times",
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
            "name": "version",
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


module.exports=Os