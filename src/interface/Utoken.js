
export default class Utoken
{
    async getEthToNDAOInputPrice(_value) {
        let _eth=this.web3.utils.toWei(_value.toString(),'ether');
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});  
        let result= await this.contract.methods.addethToNDAOInputPrice(_eth).call({from: this.selectedAccount});
        return {inAmount:parseFloat(_value.toString()),outAmount: parseFloat(this.web3.utils.fromWei(result,'ether')),inAmountWei:_eth,outAmountWei:result};
    }

    async getPrice() {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.getPrice().call({from: this.selectedAccount});
        const r1 = parseFloat(result) /  Math.pow(10,8); //(100000000);
        return {priceWei:this.web3.utils.toWei(r1.toString(),'ether'),price:r1};
    }

    async balanceOf(_address) {   
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.balanceOf(_address).call({from: this.selectedAccount});
        return {utoken: parseFloat(this.web3.utils.fromWei(result,'ether')),utokenWei:result};
    }
    async allowance(_owneraddress,_speneraddress) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result= await this.contract.methods.allowance(_owneraddress,_speneraddress).call({from: this.selectedAccount});
        return {approveSumWei: result,approveSum:parseFloat(this.web3.utils.fromWei(result,'ether'))};
    }

    async  approve(_spaneraddress,_amount) {
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let re=  await  this.contract.methods.approve(_spaneraddress,this.web3.utils.toWei(_amount.toString())).send({from: this.selectedAccount});
        return re;

    }

    async swap(_value) {
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, {from: this.selectedAccount});
        const etherValue = this.web3.utils.toWei(_value.toString(), 'ether');
        let re = await this.contract.methods.swap().send({from: this.selectedAccount, value: this.web3.utils.toHex(etherValue)});
        return re;
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
        this.address='0x496b64092096Ac8d5E32df00D60C3128c06cF00E';
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
  
  