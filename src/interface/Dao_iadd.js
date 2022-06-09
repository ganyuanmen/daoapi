const iadd_abi=require('../data/iadd_abi');
class Dao_iadd
{
  
    async utokenToToken(_amount,_id) {
       if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
       let e= await this.commulate.utokenToToken(_amount,_id);
       let result= await this.contract.NDAOToToken(e.outAmountWei,this.ether.utils.parseEther(_amount+''),_id,this.selectedAccount);
       await result.wait();
        return result;
    }
   
    async tokenToUtoken(_amount,_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let e= await this.commulate.tokenToUtoken(_amount,_id);
        let result= await this.contract.TokenToNDAO(e.outAmountWei,this.ether.utils.parseEther(_amount+''),_id,this.selectedAccount);
        await result.wait()
        return result;
    }
  

    async tokenToToken(_amount,_id1,_id2) {
    
      if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
      let e= await this.commulate._tokenToToken(_amount,_id1,_id2);
      let result= await this.contract.TokenToToken(e[0], e[1], this.ether.utils.parseEther(_amount+''),_id1,_id2,this.selectedAccount);
      await result.wait()
      return result;
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
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.getPool(_id);
        return {utoken: this.ether.utils.formatEther(this.getReal(result.uToken.toString()),'ether'),utokenWei:this.getReal(result.uToken.toString())};
    
    }
   
  
 
    setAddress(_address)
    {
        this.address=_address;
    }
    setAbi(_abi)
    {
        this.abi=_abi;
    }
    constructor(_ether,_etherProvider,_selectAccount,_commulate) {
      
        this.commulate=_commulate;
        this.etherProvider=_etherProvider;this.ether=_ether;
      
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=iadd_abi.address;
     
        this.abi=iadd_abi.abi
       }
   }
   
   module.exports=Dao_iadd