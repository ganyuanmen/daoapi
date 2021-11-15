export default  class IADD
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
               _this.NDAOToToken(e.outAmountWei,_this.web3.utils.toWei(_amount.toString(),'ether'),_id).then(e2=>{
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
               _this.TokenToNDAO(e.outAmountWei,_this.web3.utils.toWei(_amount.toString(),'ether'),_id).then(e2=>{
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
        let result = await this._tokenToUtoken(_amount,_id1,_id2);
        return result;
    }
    
    _tokenToToken(_amount,_id1,_id2)
    {
        let _this=this;
        let p = new Promise(function (resolve, reject) {
       _this.commulate._tokenToToken(_amount,_id1,_id2).then(e=>{      
               _this.TokenToToken1(e[0], e[1], _this.web3.utils.toWei(_amount.toString(),'ether'),_id1,_id2).then(e2=>{
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
        return {utoken: parseFloat(this.web3.utils.fromWei(this.getReal(result.uToken),'ether')),utokenWei:this.getReal(result.uToken)};
    
    }

    utokenTotokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        _this.maxu2t=maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.UToToken({
            filter: {}, 
            fromBlock: _this.maxu2t,
        }, function (_error, data) {
            if(data.blockNumber>_this.maxu2t) {
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "from": data.returnValues.spender,
                        "to": data.returnValues.to,
                        "tokenId":data.returnValues.id,
                        "utokenWei":data.returnValues.uAmount,
                        "tokenWei":data.returnValues.tokenAmount,
                        "utoken":parseFloat(_this.web3.utils.fromWei(data.returnValues.uAmount,'ether')),
                        "token":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether'))
                    },
                    "event": "utokenTotokenEvent"})
                 _this.maxu2t=data.blockNumber;
             }
        })
    }

    tokenToUtokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        _this.maxt2u=maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.TokenToU({
            filter: {}, 
            fromBlock: _this.maxt2u,
        }, function (_error, data) {
            if(data.blockNumber>_this.maxt2u) {
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "from": data.returnValues.spender,
                        "to": data.returnValues.to,
                        "tokenId":data.returnValues.id,
                        "utokenWei":data.returnValues.uAmount,
                        "tokenWei":data.returnValues.tokenAmount,
                        "utoken":parseFloat(_this.web3.utils.fromWei(data.returnValues.uAmount,'ether')),
                        "token":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether'))
                    },
                    "event": "tokenToUtokenEvent"})
                 _this.maxt2u=data.blockNumber;
             }
        })
    }

    tokenTotokenEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        _this.maxt2t=maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        this.contract.events.ETokenToToken({
            filter: {}, 
            fromBlock: _this.maxt2t,
        }, function (_error, data) {
            if(data.blockNumber>_this.maxt2t) {
                callbackFun.call(null,{                  
                    "address": data.address,
                    "blockHash": data.blockHash,
                    "blockNumber": data.blockNumber,
                    "transactionHash": data.transactionHash,
                    "transactionIndex":data.transactionIndex,
                    "data": {
                        "from": data.returnValues.spender,
                        "to": data.returnValues.to,
                        "fromTokenId":data.returnValues.id,
                        "toTokenId":data.returnValues.swapid,
                        "fromtokenWei":data.returnValues.tokenAmount,
                        "toTokenWei":data.returnValues.swapTokenAmount,
                        "fromToken":parseFloat(_this.web3.utils.fromWei(data.returnValues.tokenAmount,'ether')),
                        "toToken":parseFloat(_this.web3.utils.fromWei(data.returnValues.swapTokenAmount,'ether'))
                    },
                    "event": "tokenTotokenEvent"})
                 _this.maxt2t=data.blockNumber;
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
    constructor(_web3,_selectAccount,_commulate) {
      
        this.commulate=_commulate;
        this.web3=_web3;
        this.contract=undefined;
        this.maxu2t=0;
        this.maxt2u=0;
        this.maxt2t=0;
        this.selectedAccount=_selectAccount;
        this.address='0x9752AE638E7f62dcB802cC0755570B1af528b6E8';
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
   
   