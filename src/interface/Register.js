'use strict';
class Register
{
    async  create(_address,_daoName,_daoShortName,_remark) {
       
         if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
         let result= await  this.contract.methods.create(_address,_daoName,_daoShortName,'',_remark,true).send({from: this.selectedAccount});
         return result;
    }
    async getDaos(_address) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getDaos(_address).call({from: this.selectedAccount});
        let re=[];
        for(let i=0;i<result[0].length;i++) {
            re.push({name:result[0][i],id:result[1][i]})
        }
        return re;
    }
    async  createOs(_id,_daoName,_addressArray,_initArray) {
        if(!_initArray)  _initArray=[1,1,1,1];
        let _ren1 = [];
        let _ren2 = [];
        _addressArray.forEach(element => {
            _ren1.push(element.address);
            _ren2.push(element.vote)
        });

        //参数编码
        let _voteData = propertis.web3.eth.abi.encodeParameters(['uint32', 'uint32', 'uint32', 'uint32'], _initArray);
        //函数编码
        let _functionCode = propertis.web3.eth.abi.encodeFunctionCall({
            name: 'init',
            type: 'function',
            inputs: [{
                type: 'bytes',
                name: 'voteData'
            }, {
                type: 'uint32',
                name: '_daoNumber'
            }, {
                type: 'string',
                name: '_to'
            }]
        }, [_voteData, _id, '0x0000000000000000000000000000000000000000']);

        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        // propertis.register.createOs().then(re => {
        //     _this.div[2].removeClass('was-validated');
        //     _this.tip.toast.hide();
        // });
        let result= await this.contract.methods.createOs(_daoName, _ren1, _ren2, [_functionCode], [_voteData]).send({from: this.selectedAccount});
        return result;

    }
    async getDao(_daoId) {

        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getOss(_daoId).call({from: this.selectedAccount});
        return {name: result.name,describe:result.dsc,osAddress:result.os,symbol:result.symbol};
    }
 
    createDaoEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        _this.maxBlock=maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.Create({
            filter: {}, 
            fromBlock: _this.maxBlock,
        }, function (_error, data) {
          
            if(data.blockNumber>_this.maxBlock) {
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
                            "daoId": data.returnValues.id
                        },
                        "event": "createDaoEvent"
               })
                _this.maxBlock=data.blockNumber;
            }


        });
     
     
    }

    createOsEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        _this.osMaxBlock=maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.CreateOs({
            filter: {}, 
            fromBlock: _this.osMaxBlock,
        }, function (_error, data) {
          
            if(data.blockNumber>_this.osMaxBlock) {
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "osAddress": data.returnValues.os,
                        "daoId": data.returnValues.id
                    },
                    "event": "createOsEvent"})
                 _this.osMaxBlock=data.blockNumber;
             }
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
    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.contract=undefined;
        this.maxBlock=0;
        this.osMaxBlock=0;
        this.selectedAccount=_selectAccount;
        this.address='0x14052eB4d8A1B77D8aaCFda576f6B398358E4BD8';
        this.abi=
            [
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
                            "name": "_iOsA",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_iVoteA",
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
                    "name": "changePay",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_msg",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_logo",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_dsc",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "_issue",
                            "type": "bool"
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
                        },
                        {
                            "internalType": "address[]",
                            "name": "adds",
                            "type": "address[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "_bili",
                            "type": "uint256[]"
                        },
                        {
                            "internalType": "bytes[]",
                            "name": "_initData",
                            "type": "bytes[]"
                        },
                        {
                            "internalType": "bytes[]",
                            "name": "_message",
                            "type": "bytes[]"
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_manager",
                            "type": "address"
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
                                    "name": "logo",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dsc",
                                    "type": "string"
                                },
                                {
                                    "internalType": "address",
                                    "name": "os",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "databaseChart",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "voteChart",
                                    "type": "address"
                                },
                                {
                                    "internalType": "address",
                                    "name": "appInfo",
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
                    "inputs": [],
                    "name": "iVoteA",
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
                    "name": "init",
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
                            "name": "_token",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_init",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_install",
                            "type": "address"
                        }
                    ],
                    "name": "initOneTime",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "install",
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
                    "name": "tokenA",
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

module.exports=Register