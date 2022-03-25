'use strict';
class EthToToken
{
    // async ETHToExactToken(_ethmin,_utokenmin,_id,_eth) {
    //     if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
    //     let result= await this.contract.methods.ETHToExactToken(_ethmin,_utokenmin,_id).send({from: this.selectedAccount, value: this.web3.utils.toHex(_eth)});
    //     return result;
    // }
    
    async ethToToken(_eth,_id) {
       if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
       let e=await this.utoken.getEthToNDAOInputPrice(_eth);
       let e1=await this.commulate.wutokenToToken(e.outAmountWei,_id);
       let result= await this.contract.methods.ETHToExactToken(e1.outAmountWei,e.outAmountWei,_id).send({from: this.selectedAccount, value: this.web3.utils.toHex(this.web3.utils.toWei(_eth+'','ether'))});
       return result;
      
    }
    // _ethTotoken(_eth,_id)
    // {
    //     let _this=this;
    //     let p = new Promise(function (resolve, reject) {
    //    _this.utoken.getEthToNDAOInputPrice(_eth).then(e=>{
    //          _this.commulate.wutokenToToken(e.outAmountWei,_id).then(e1=>{
    //            _this.ETHToExactToken(e1.outAmountWei,e.outAmountWei,_id,_this.web3.utils.toWei(_eth+'','ether')).then(e2=>{
    //             resolve(e2)
    //            })
    //          })
    //        })
    //     });
    //     return p;
    // }
  
    setAddress(_address)
    {
        this.address=_address;
    }
    setAbi(_abi)
    {
        this.abi=_abi;
    }
    constructor(_web3,_selectAccount,_address,_utoekn,_commulate) {
        this.web3=_web3;
        this.utoken=_utoekn;
        this.commulate=_commulate;
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=_address;
      this.abi=[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_IADD",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_uToken",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
                    "name": "minNdaoAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "ETHToExactToken",
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
            "name": "IADDAddress",
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
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "uTokenAddress",
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

module.exports=EthToToken