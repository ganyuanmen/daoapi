const register_abi=require('../data/DaoRegistrar_abi');
const utils=require('../utils')
/**
 * 注册dao
 */
class DaoRegistrar
{
  // /**设置创建dao的支付费用
  //  * @param {number} _amount 单价
  //  * @returns 
  // */
  // async setDaoPrice(_amount) {
  //   this.genegateContract()
  //   console.log(this.contract)
  //   let gasLimit=await utils.estimateGas(this.contract,'setDaoPrice',[_amount],'100000')
  //   let result= await this.contract.setDaoPrice(_amount,gasLimit)
  //   await result.wait();
  //   return result;
  // }
  //-------------------------------------------------------------------------------------
  /** 根据dao Id 取dao注册时的信息
   * @param {int} _id  dao Id
   * @returns {name,symbol,desc,manager,hasToken}
  */
  async  daoInfos(_id) {    
    this.genegateContract()
    return await this.contract.daoInfos(_id)
  }

  /** 根据dao Id 取dao注册时的合约地址
   * @param {int} _id  dao Id
   * @returns address
   */
  async  creator(_id) {    
    this.genegateContract()
    return await this.contract.creator(_id)
  }

  /**根据注册dao的合约地址 取dao ID
   * @param {address} _cretor  注册dao的合约地址
   * @returns dao_id
   */
  async creatorToDao(_cretor) {    
    this.genegateContract()
    return await this.contract.creatorToDao(_cretor)
  }

  /**根据注册dao名称 取dao ID
   * @param {string} _name  注册dao的合约地址
   * @returns dao_id
   */
  async nameToId(_name) {    
    this.genegateContract()
    return await this.contract.nameToId(_name)
  }

  /** 根据注册dao 符号(symbol) 取dao ID
   * @param {string} _symbol  注册dao的合约地址
   * @returns dao_id
   */
  async symbolToId(_symbol) {    
    this.genegateContract()
    return await this.contract.symbolToId(_symbol)
  }

  genegateContract(){
    if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);
  }

  constructor(_ethers,_ethersProvider,_account,_address) {
    this.ethersProvider=_ethersProvider;this.ethers=_ethers;
    this.account=_account;      
    this.address=_address;
    this.abi=register_abi.abi
  }
}

module.exports=DaoRegistrar