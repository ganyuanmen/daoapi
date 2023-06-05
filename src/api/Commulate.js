const commulate_abi=require('../data/commulate_abi');
/**
 * 查询兑换的结果
 */
class Commulate
{
     /**
     * utoken-->token
     * @param {number} _value  utoken 数值(单位：wei)
     * @param {int} _id   token ID
     * @returns 
     */
    async unitTokenToDaoToken(_value,_id) {
        this.genegateContract()
        return await this.contract.unitTokenToDaoToken(_value,_id);
    }
       
    /**
     * token-->utoken
     * @param {number} _value token数据(单位：wei)
     * @param {int} _id token ID
     * @returns 
     */
    async daoTokenToUnitToken(_value,_id) {
        this.genegateContract()
        return await this.contract.daoTokenToUnitToken(_value,_id);
    }

    /**
     * token-->token
     * @param {number} _value 兑换token 值 (单位：wei)
     * @param {int} _id1 兑换token ID（from） 
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
    async DaoTokenToDaoToken(_value,_id1,_id2) {
        this.genegateContract()
        return await this.contract.DaoTokenToDaoToken(_value,_id1,_id2);
    }

    /**
     * utoken-->token
     * @param {number} _value  utoken 数值
     * @param {int} _poolId   token ID
     * @returns 
     */
     async unitTokenToExactDaoToken(_value,_poolId) {
        this.genegateContract()
        return await this.contract.unitTokenToExactDaoToken(_value,_poolId);
    }
    
    /**
     * token-->utoken
     * @param {number} _value token数据
     * @param {int} _poolId   token ID
     * @returns 
     */
     async daoTokenToExactUnitToken(_value,_poolId) {
        this.genegateContract()
       return await this.contract.daoTokenToExactUnitToken(_value ,_poolId);

    }

    /**
     * token-->token
     * @param {number} _value 兑换token 值
     * @param {int} _id1 兑换token ID（from）
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
     async daoTokenToExactDaoToken(_value,_id1,_id2) {
        this.genegateContract()
        return await this.contract.daoTokenToExactDaoToken(_value,_id1,_id2);
    }

 
  
    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }

    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;      
        this.address=_address;
       this.abi=commulate_abi.abi
    }
}

module.exports=Commulate