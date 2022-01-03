
class GetOrgId
{
    
    async  getOrgId(_daoId) {    
        if(!this.contract)  this.contract=new this.web3.eth.Contract(this.abi,this.address , {from: this.selectedAccount});
        let result = await this.contract.methods.getORGId(_daoId).call({from: this.selectedAccount});
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
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    

        this.address='0x776c1D993aE1CA06eDFD297D7e99379b1739647f';
        this.abi=[
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_register",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_org",
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
                        "name": "daoNumber",
                        "type": "uint32"
                    }
                ],
                "name": "getORGId",
                "outputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}

module.exports=GetOrgId