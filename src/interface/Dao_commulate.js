const commulate_abi=require('../data/commulate_abi');
/**
 * 查询兑换的结果
 */
class Dao_commulate
{
     /**
     * utoken-->token
     * @param {number} _value  utoken 数值(单位：wei)
     * @param {int} _id   token ID
     * @returns 
     */
    async wutokenToToken(_value,_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.NDAOToToken(_value+'',_id);
        return {inAmountWei:_value,outAmountWei: result.toString(),inAmount:this.ether.utils.formatEther(_value+''),outAmount:this.ether.utils.formatEther(result)};
    }
       
    /**
     * token-->utoken
     * @param {number} _value token数据(单位：wei)
     * @param {int} _id token ID
     * @returns 
     */
    async wtokenToUtoken(_value,_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToNDAO(_value,_id);
        return {inAmountWei:_value,outAmountWei: result.toString(),inAmount:this.ether.utils.formatEther(_value+''),outAmount:this.ether.utils.formatEther(result)};
    }

    /**
     * token-->token
     * @param {number} _value 兑换token 值 (单位：wei)
     * @param {int} _id1 兑换token ID（from） 
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
    async wtokenToToken(_value,_id1,_id2) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToToken(_value,_id1,_id2);
        return {inAmountWei:_value,outAmountWei: result[1].toString(),inAmount:this.web3.utils.formatEther(_value+''),outAmount:this.ether.utils.formatEther(result[1])};
    }

    /**
     * utoken-->token
     * @param {number} _value  utoken 数值
     * @param {int} _id   token ID
     * @returns 
     */
     async utokenToToken(_value,_id) {
        let _shu=this.ether.utils.parseEther(_value+'').toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.NDAOToToken(_shu,_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result)};
    }
    
    /**
     * token-->utoken
     * @param {number} _value token数据
     * @param {int} _id token ID
     * @returns 
     */
     async tokenToUtoken(_value,_id) {
        let _shu = this.ether.utils.parseEther(_value + "").toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToNDAO(_shu,_id);
        return {inAmountWei:_shu,outAmountWei: result.toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result)};
    }

    /**
     * token-->token
     * @param {number} _value 兑换token 值
     * @param {int} _id1 兑换token ID（from）
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
     async tokenToToken(_value,_id1,_id2) {
        let _shu = this.ether.utils.parseEther(_value + "").toString();
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.TokenToToken(_shu,_id1,_id2);
        return {inAmountWei:_shu,outAmountWei: result[1].toString(),inAmount:_value+'',outAmount:this.ether.utils.formatEther(result[1])};
    }

 
     /**
     * token-->token,合约直接返回值，未做处理
     * @param {number} _value 兑换token 值
     * @param {int} _id1 兑换token ID（from）
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
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
    
    constructor(_ether,_etherProvider,_selectAccount,_address) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;        
        this.address=_address;
     
       this.abi=commulate_abi.abi
    }
}

module.exports=Dao_commulate