
class CheckVote
{
     
    async  install(_appsetId,_version) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result = await this.contract.methods.install(_appsetId,_version).send({from: this.selectedAccount});
        return result;
   }

   
   async  init(_appsetId,_bytes) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
    let result = await this.contract.methods.init(_appsetId,_bytes).send({from: this.selectedAccount});
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
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    
      
        this.address=_address;
       // console.log("----CheckVote-------->"+this.address);
        this.abi=[
            {
                "inputs": [
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
                "inputs": [],
                "name": "externalCharge",
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
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
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
                        "internalType": "address",
                        "name": "_external",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_internal",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_os",
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
                        "internalType": "uint64",
                        "name": "_number",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint32",
                        "name": "_version",
                        "type": "uint32"
                    }
                ],
                "name": "install",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_number",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint16",
                        "name": "_version",
                        "type": "uint16"
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "initData",
                        "type": "bytes[]"
                    },
                    {
                        "internalType": "address",
                        "name": "_vote",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_out",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    }
                ],
                "name": "installInOne",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "internalCharge",
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
                "name": "os",
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

module.exports=CheckVote