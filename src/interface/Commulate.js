export default class Commulate
{
    
    async utokenToToken(_value,_id) {
        let _shu=this.web3.utils.toWei(_value.toString(),'ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.NDAOToToken('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:parseFloat(_value.toString()),outAmount:parseFloat(this.web3.utils.fromWei(result,'ether'))};
    }
    
    async tokenToUtoken(_value,_id) {
        let _shu=this.web3.utils.toWei(_value.toString(),'ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToNDAO('0',_shu,_id).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result,inAmount:parseFloat(_value.toString()),outAmount:parseFloat(this.web3.utils.fromWei(result,'ether'))};
    }

    async tokenToToken(_value,_id1,_id2) {
        let _shu=this.web3.utils.toWei(_value.toString(),'ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.TokenToToken('0','0',_shu,_id1,_id2).call({from: this.selectedAccount});
        return {inAmountWei:_shu,outAmountWei: result[1],inAmount:parseFloat(_value.toString()),outAmount:parseFloat(this.web3.utils.fromWei(result[1],'ether'))};
    }

    async _tokenToToken(_value,_id1,_id2) {
        let _shu=this.web3.utils.toWei(_value.toString(),'ether');
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
    
    constructor(_web3,_selectAccount) {
        this.web3=_web3;
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address='0x5C90A31B5D96aF316bbC9ae9c58D298d97F94787';      
        this.abi=

        [
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
