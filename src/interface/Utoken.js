'use strict';
const daolog = require("../utils");
 class Utoken
{
    async getEthToNDAOInputPrice(_value) {
        let _eth=this.web3.utils.toWei(_value+'','ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.addethToNDAOInputPrice(_eth).call({from: this.selectedAccount});
        return {inAmount:parseFloat(_value+''),outAmount: this.web3.utils.fromWei(result,'ether'),inAmountWei:_eth,outAmountWei:result};
    }

    async getPrice() {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPrice().call({from: this.selectedAccount});
        let _a = result.split('').reverse();
        let _b = _a.length
        if (_a.length < 8) {
            for (let i = 0; i < 8 - _b; i++) {
                _a.push('0');
            }
        }
        _a.splice(8, 0, ".")
        if (_a[_a.length - 1] == '.') {
            _a.push('0')
        }
        let _c = _a.reverse().join('');

        
        return {priceWei:this.web3.utils.toWei(_c,'ether'),price:_c};
    }

    async balanceOf(_address) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.balanceOf(_address).call({from: this.selectedAccount});
        return {utoken: this.web3.utils.fromWei(result,'ether'),utokenWei:result};
    }

    async allowance(_owneraddress,_speneraddress) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.allowance(_owneraddress,_speneraddress).call({from: this.selectedAccount});
        return {approveSumWei: result,approveSum:this.web3.utils.fromWei(result,'ether')};
    }


    async  approve(_spaneraddress,_amount) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let re=  await  this.contract.methods.approve(_spaneraddress,_amount).send({from: this.selectedAccount});
        return re;

    }

    async swap(v) {
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        const etherValue = this.web3.utils.toWei(v+'', 'ether');
        let re = await this.contract.methods.swap().send({from: this.selectedAccount, value: this.web3.utils.toHex(etherValue)});
        return re;
    }
      
    async swapDETHTo(_address,_shu) {
      
        let _amount=this.web3.utils.toWei(_shu+'', 'ether');
      
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let re=  await  this.contract.methods.swapDETHTo(_address,_amount).send({from: this.selectedAccount});
        return re;

    }

    

    unsub()
    {
        try{
            if(this.swapObj && this.swapObj.unsubscribe)
            {
                this.swapObj.unsubscribe();
            }
            if(this.dethswapObj && this.dethswapObj.unsubscribe)
            {
                this.dethswapObj.unsubscribe();
            }
            if(this.swapobjTo && this.swapobjTo.unsubscribe)
            {
                this.swapobjTo.unsubscribe();
            }
            this.swapObj=null;
            this.dethswapObj=null;
            this.swapobjTo=null;
        }
        catch(e){
            console.log(e);
        }
    }

    swapEvent(maxBlockNumber,callbackFun) {
      
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        
      
        this.swapObj=this.contract.events.Swap({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
            if(!data || !data.returnValues) {
                daolog.log("swapEvent error");
                if(this.para) this.para.isError=true;
                return;
            }
          
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "address": data.returnValues[0],
                    "ethAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[1],'ether')).toFixed(4), 
                    "utokenAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[2],'ether')).toFixed(4),
                    "swapTime":data.returnValues[3]
                },
                "event": "swapEvent"})
        })
    }

    swapToEvent(maxBlockNumber,callbackFun) {
      
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        
        this.swapobjTo=this.contract.events.SwapTo({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
           
            if(!data || !data.returnValues) {
                daolog.log("swapEvent error");
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
                    "address": (eobj && eobj.from)?eobj.from:'',
                    "to": data.returnValues[1],
                    "ethAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[2],'ether')).toFixed(4), 
                    "utokenAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[3],'ether')).toFixed(4),
                    "swapTime":data.returnValues[4]
                },
                "event": "swapToEvent"})
            })
        })
    }

    swapDethEvent(maxBlockNumber,callbackFun) {
        const _this = this;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        if(this.dethswapObj && this.dethswapObj.unsubscribe)
        {
           // this.p("unsubscribe:daoCreateEvent");
            this.dethswapObj.unsubscribe();
        }
        this.dethswapObj=this.contract.events.SwapDETHTo({
            filter: {}, 
            fromBlock: maxBlockNumber+1
        }, function (_error, data) {
            if(!data || !data.returnValues) {
                daolog.log("swapDethEvent error");
                if(this.para) this.para.isError=true;
                return;
            }
            callbackFun.call(null,{                  
                "address": data.address,
                "blockHash": data.blockHash,
                "blockNumber": data.blockNumber,
                "transactionHash": data.transactionHash,
                "transactionIndex":data.transactionIndex,
                "data": {
                    "fromAddress": data.returnValues[0],
                    "toAddress": data.returnValues[1],
                    "ethAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[2],'ether')).toFixed(4),
                    "utokenAmount":parseFloat(_this.web3.utils.fromWei(data.returnValues[3],'ether')).toFixed(4),
                    "swapTime":data.returnValues[4]
                },
                "event": "swapDethEvent"})
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
    constructor(_web3,_selectAccount,_address,_para) {
        daolog.log("utoken start....");
        this.web3=_web3;
        this.para=_para;
        this.contract=undefined;
        this.swapObj=undefined;
        this.swapobjTo=undefined;
        this.dethswapObj=undefined;
        this.selectedAccount=_selectAccount;
        this.address=_address;
      
        this.abi=[
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
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
                        "internalType": "address",
                        "name": "",
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
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "Swap",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "",
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
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "SwapDETHTo",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "",
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
                        "name": "tokenAmount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "SwapTo",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
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
                        "internalType": "uint256",
                        "name": "supply_",
                        "type": "uint256"
                    }
                ],
                "name": "addETH",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "addethToNDAOInputPrice",
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
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
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
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
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
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
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
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
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseAllowance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "dethIn",
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
                "name": "dethOut",
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
                "name": "ethSupply",
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
                        "name": "eth_input_amount",
                        "type": "uint256"
                    }
                ],
                "name": "ethToNDAOInputPrice",
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
                "name": "eth_supply",
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
                "name": "getPrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "price",
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
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseAllowance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "initPrice_",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ndao_supply_",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "eth_supply_",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_deth",
                        "type": "address"
                    }
                ],
                "name": "init",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "initPrice",
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
                "name": "ndaoSupply",
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
                "name": "ndao_supply",
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
                "name": "price_denominator",
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
                "name": "price_numerator",
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
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "swap",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "swapDETHTo",
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
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    }
                ],
                "name": "swapTo",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
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
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
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
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
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
                "inputs": [],
                "name": "updatePrice",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            }
        ]
      }
  }
  
  module.exports=Utoken