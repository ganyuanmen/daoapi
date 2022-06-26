const commulate_abi=require('../data/commulate_abi');
class Dao_commulate
{
    // w开头 以不损失精度为由，直接传wei, 不再转换
    async wutokenToToken(_shu,_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.NDAOToToken(_shu+'',_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:this.ether.utils.formatEther(_shu+''),outAmount:this.ether.utils.formatEther(result)};
    }
    
    async wtokenToUtoken(_shu,_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToNDAO(_shu,_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:this.ether.utils.formatEther(_shu+''),outAmount:this.ether.utils.formatEther(result)};
    }

    async wtokenToToken(_shu,_id1,_id2) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToToken(_shu,_id1,_id2);
        return {inAmountWei:_shu,outAmountWei: result[1].toString(),inAmount:this.web3.utils.formatEther(_shu+''),outAmount:this.ether.utils.formatEther(result[1])};
    }
//---------------------------------------------------------
    async utokenToToken(_value,_id) {
        let _shu=this.ether.utils.parseEther(_value+'').toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.NDAOToToken(_shu,_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result)};
    }
    
    async tokenToUtoken(_value,_id) {
        let _shu = this.ether.utils.parseEther(_value + "").toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToNDAO(_shu,_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result)};
    }

    async tokenToToken(_value,_id1,_id2) {
        let _shu = this.ether.utils.parseEther(_value + "").toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToToken(_shu,_id1,_id2);
        return {inAmountWei:_shu,outAmountWei: result[1].toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result[1])};
    }

    async _tokenToToken(_value,_id1,_id2) {
        let _shu = this.ether.utils.parseEther(_value + "").toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToToken(_shu,_id1,_id2);
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
    
    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;        
        this.address=commulate_abi.address;
     
       this.abi=commulate_abi.abi
    }
}

module.exports=Dao_commulate