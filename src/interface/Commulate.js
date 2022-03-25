'use strict';
class Commulate
{
    // w开头 以不损失精度为由，直接传wei, 不再转换
    async wutokenToToken(_shu,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToToken('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:this.web3.utils.fromWei(_shu,'ether'),outAmount:this.web3.utils.fromWei(result,'ether')};
    }
    
    async wtokenToUtoken(_shu,_id) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAO('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:this.web3.utils.fromWei(_shu,'ether'),outAmount:this.web3.utils.fromWei(result,'ether')};
    }

    async wtokenToToken(_shu,_id1,_id2) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken('0','0',_shu,_id1,_id2).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result[1],inAmount:this.web3.utils.fromWei(_shu,'ether'),outAmount:this.web3.utils.fromWei(result[1],'ether')};
    }
//---------------------------------------------------------
    async utokenToToken(_value,_id) {
        let _shu=this.web3.utils.toWei(_value+'','ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToToken('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:parseFloat(_value+''),outAmount:this.web3.utils.fromWei(result,'ether')};
    }
    
    async tokenToUtoken(_value,_id) {
        let _shu=this.web3.utils.toWei(_value+'','ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAO('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:parseFloat(_value+''),outAmount:this.web3.utils.fromWei(result,'ether')};
    }

    async tokenToToken(_value,_id1,_id2) {
        let _shu=this.web3.utils.toWei(_value+'','ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken('0','0',_shu,_id1,_id2).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result[1],inAmount:parseFloat(_value+''),outAmount:this.web3.utils.fromWei(result[1],'ether')};
    }

    async _tokenToToken(_value,_id1,_id2) {
        let _shu=this.web3.utils.toWei(_value+'','ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken('0','0',_shu,_id1,_id2).call({from: this.selectedAccount});
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
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=_address;
     
       this.abi=[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_iadd",
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
            "stateMutability": "view",
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
            "stateMutability": "view",
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
            "stateMutability": "view",
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
            "stateMutability": "view",
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
                }
            ],
            "name": "TokenToToken",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
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
        }
    ]
    }
}

module.exports=Commulate