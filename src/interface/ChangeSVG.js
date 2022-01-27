
class ChangeSVG
{
     
    async  changeLogo(_daoId,_logo,_type) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result = await this.contract.methods.changeLogo(_daoId,_logo,_type).send({from: this.selectedAccount});
        return result;
   }

   
   async  init(_dsc,_root,_os) {    
    if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
    let result = await this.contract.methods.init(_dsc,_root,_os).send({from: this.selectedAccount});
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
     //   console.log("----ChangeSVG-------->"+this.address);
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
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_logo",
                        "type": "bytes"
                    },
                    {
                        "internalType": "string",
                        "name": "_fileType",
                        "type": "string"
                    }
                ],
                "name": "changeLogo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
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

module.exports=ChangeSVG