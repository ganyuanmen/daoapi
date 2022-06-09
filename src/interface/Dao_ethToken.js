const ethToken_abi=require('../data/ethToken_abi');
class Dao_ethToken
{
  
    
    async ethToToken(_eth,_id) {
       if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
       let e=await this.utoken.getEthToNDAOInputPrice(_eth);
       let e1=await this.commulate.wutokenToToken(e.outAmountWei,_id);
       let result= await this.contract.ETHToExactToken(e1.outAmountWei,e.outAmountWei,_id,{value:this.ether.utils.parseEther(_eth+'')})
       await result.wait()
      
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
    constructor(_ether,_etherProvider,_selectAccount,_utoekn,_commulate) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.utoken=_utoekn;
        this.commulate=_commulate;
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=ethToken_abi.address;
      this.abi=ethToken_abi.abi

    }
}

module.exports=Dao_ethToken