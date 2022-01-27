'use strict';

const daolog = require("../utils");
class IADD
{
  
    async NDAOToToken(_mintoken,_token,_id) {
      
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToToken(_mintoken,_token,_id,this.selectedAccount).send({from: this.selectedAccount});
        return result;
    }

    async utokenToToken(_amount,_id) {
        let result = await this._utokenToToken(_amount,_id);
        return result;
    }
    
    _utokenToToken(_amount,_id)
    {
        let _this=this;
        let p = new Promise(function (resolve, reject) {
       _this.commulate.utokenToToken(_amount,_id).then(e=>{      
               _this.NDAOToToken(e.outAmountWei,_this.web3.utils.toWei(_amount+'','ether'),_id).then(e2=>{
                resolve(e2)
               })
           })
        });
        return p;
    }
 


    async TokenToNDAO(_mintoken,_token,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAO(_mintoken,_token,_id,this.selectedAccount).send({from: this.selectedAccount});
        return result;
    }
    async tokenToUtoken(_amount,_id) {
        let result = await this._tokenToUtoken(_amount,_id);
        return result;
    }
    
    _tokenToUtoken(_amount,_id)
    {
        let _this=this;
        let p = new Promise(function (resolve, reject) {
       _this.commulate.tokenToUtoken(_amount,_id).then(e=>{      
               _this.TokenToNDAO(e.outAmountWei,_this.web3.utils.toWei(_amount+'','ether'),_id).then(e2=>{
                resolve(e2)
               })
           })
        });
        return p;
    }


    async TokenToToken1(_mintoken1,_mintoken2,_token,_id1,_id2) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken(_mintoken1,_mintoken2,_token,_id1,_id2,this.selectedAccount).send({from: this.selectedAccount});
        return result;
    }

    async tokenToToken(_amount,_id1,_id2) {
        let result = await this._tokenToToken(_amount,_id1,_id2);
        return result;
    }
    
    _tokenToToken(_amount,_id1,_id2)
    {
        let _this=this;
        let p = new Promise(function (resolve, reject) {
       _this.commulate._tokenToToken(_amount,_id1,_id2).then(e=>{   
               _this.TokenToToken1(e[0], e[1], _this.web3.utils.toWei(_amount+'','ether'),_id1,_id2).then(e2=>{
                resolve(e2)
               })
           })
        });
        return p;
    }


    getReal(v){
        var b=v.split('');
        for(var i=1;i<b.length;i++)
             {
                 if(b[i]!='0')
                 break               
             }
        return v.substr(i);

    }

    async getPool(_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPool(_id).call({from: this.selectedAccount});
        return {utoken: this.web3.utils.fromWei(this.getReal(result.uToken),'ether'),utokenWei:this.getReal(result.uToken)};
    
    }
    unsub()
    {
        try{
            if(this.u2tObj && this.u2tObj.unsubscribe)
            {
                this.u2tObj.unsubscribe();
            }
            if(this.t2uObj && this.t2uObj.unsubscribe)
            {
                this.t2uObj.unsubscribe();
            }
             if(this.t2tObj && this.t2tObj.unsubscribe)
            {
                this.t2tObj.unsubscribe();
            }
            this.u2tObj=null;
            this.t2uObj=null;
            this.t2tObj=null;


        }
        catch(e){
            console.log(e);
        }
    }

    // p(k)
    // {
    //     var myDate = new Date();
    //     console.log(myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()+"-->"+k)
    // }
    utokenTotokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        
        this.u2tObj=this.contract.events.UToToken({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
           
            if(!data || !data.returnValues) {
                daolog.log("utokenTotokenEvent error");
                if(this.para) this.para.isError=true;
                return;
            }
            _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "from": data.returnValues.spender,
                        "to": data.returnValues.to,
                        "swap_time":ee.timestamp,
                        "tokenId":data.returnValues.id,
                        "utokenWei":data.returnValues.uAmount,
                        "tokenWei":data.returnValues.tokenAmount,
                        "utoken":parseFloat(_this.web3.utils.fromWei(data.returnValues.uAmount,'ether')).toFixed(4),
                        "token":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether')).toFixed(4)
                    },
                    "event": "utokenTotokenEvent"})
            })

          
        })
    }

    tokenToUtokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
       
        this.t2uObj=this.contract.events.TokenToU({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {  
          
            if(!data || !data.returnValues) {
                daolog.log("tokenToUtokenEvent error");
                if(this.para) this.para.isError=true;
                return;
            }   
            _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "from": data.returnValues.spender,
                    "to": data.returnValues.to,
                    "swap_time":ee.timestamp,
                    "tokenId":data.returnValues.id,
                    "utokenWei":data.returnValues.uAmount,
                    "tokenWei":data.returnValues.tokenAmount,
                    "utoken":parseFloat(_this.web3.utils.fromWei(data.returnValues.uAmount,'ether')).toFixed(4),
                    "token":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether')).toFixed(4)
                },
                "event": "tokenToUtokenEvent"})
            })
        })
    }

    tokenTotokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
      
        this.t2tObj=this.contract.events.ETokenToToken({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {  
            
            if(!data || !data.returnValues) {
                daolog.log("tokenTotokenEvent error");
                if(this.para) this.para.isError=true;
                return;
            }   
            _this.web3.eth.getBlock(data.blockNumber).then(ee=>{
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "from": data.returnValues.spender,
                    "to": data.returnValues.to,
                    "swap_time":ee.timestamp,
                    "fromTokenId":data.returnValues.id,
                    "toTokenId":data.returnValues.swapid,
                    "fromtokenWei":data.returnValues.tokenAmount,
                    "toTokenWei":data.returnValues.swapTokenAmount,
                    "fromToken":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether')).toFixed(4),
                    "toToken":parseFloat(_this.web3.utils.fromWei(data.returnValues.swapTokenAmount,'ether')).toFixed(4)
                },
                "event": "tokenTotokenEvent"})
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
    constructor(_web3,_selectAccount,_address,_commulate,_para) {
      
        this.commulate=_commulate;
        this.web3=_web3;
        this.u2tObj=undefined;
        this.t2uObj=undefined;
        this.para=_para;
        this.t2tObj=undefined;
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=_address;
      //  console.log("-----IADD------->"+this.address);
        this.abi=[
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_total_supply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_initUToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_uTokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_register",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_tokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_feeTaker",
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
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "ethAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "swapTokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "EETHToToken",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "swapTokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "swapid",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "ETokenToToken",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "uAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "TokenToU",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "uAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "UToToken",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "maxAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "NDAOToExactToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "minamount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ndaoAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "NDAOToToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "token_out_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "NDAOToTokenOutputPrice",
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
                        "internalType": "uint256",
                        "name": "maxAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ndaoAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "TokenToExactNDAO",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "maxAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id2",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "TokenToExactToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "minamount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "TokenToNDAO",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "ndao_out_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "TokenToNDAOOutputPrice",
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
                        "internalType": "uint256",
                        "name": "minamount1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minamount2",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "TokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id2",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_msg",
                        "type": "address"
                    }
                ],
                "name": "TokenToToken",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getFee",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "getPool",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "supply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "uToken",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct IADD.Pool",
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
                        "name": "ndaoAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "getPowerPoolPriceNDAOToToken",
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
                        "internalType": "uint256",
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "getPowerPoolPriceTokenToNDAO",
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
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "getTokenFee",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "registerPool",
                "outputs": [],
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
                "name": "tokenFee",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
       }
   }
   
   module.exports=IADD