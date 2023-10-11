const iadd_abi=require('../data/_IADD_abi');
const utils=require('../utils')
/**
 * IADD 网络兑换
 */
class IADD
{
  
     /**
     * eth-->token
     * @param {number} _eth utoken 值
     * @param {int} _id  token ID
     * @param {number} _minRatio  滑点值
     * @returns 
     */
     async ethToDaoToken(_eth,_id,_minRatio) {

        this.genegateContract()
        let _amount=this.ethers.utils.parseEther(_eth+'')
        let minUtoken= await this.utoken.getOutputAmount(_amount)
        let minDaotoken=await this.commulate.unitTokenToDaoToken(minUtoken[0].toString(),_id)
        let temp=parseFloat(this.ethers.utils.formatEther(minDaotoken.toString()))
        let minratio=this.ethers.utils.parseEther(temp*(1-_minRatio/100)+'')
        let result= await this.contract.ethToDaoToken(minUtoken[0].toString(),minratio,_id,this.account,{value: _amount});
        await result.wait();
        return result;
     }
   
     async ethToDaoTokenGas(_eth,_id) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_eth+'')
      let minUtoken= await this.utoken.getOutputAmount(_amount)
      let code=this.contract.interface.encodeFunctionData('ethToDaoToken',[minUtoken[0],0,_id,this.account])
      let gas1=await this.ethersProvider.provider.estimateGas(this.address,code)
      let gas2=await this.contract.estimateGas.ethToDaoToken(minUtoken[0],0,_id,this.account,{value: _amount})   
      return this.ethers.utils.formatUnits(gas1.toNumber()+gas2.toNumber(),'gwei')     
   }
     
    /**
     * utoken-->token
     * @param {number} _value utoken 值
     * @param {int} _id  token ID
     * @param {number} _minRatio  滑点值
     * @returns 
     */
    async unitTokenToDaoToken(_value,_id,_minRatio) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      let min_amount= await this.commulate.unitTokenToDaoToken(_amount,_id);    
      let temp= parseFloat(this.ethers.utils.formatEther(min_amount))
      let minratio=this.ethers.utils.parseEther(temp*(1-_minRatio/100)+'')
      let result= await this.contract.unitTokenToDaoToken(minratio,_amount,_id,this.account);
       await result.wait();
       return result;
    }

    async unitTokenToDaoTokenGas(_value,_id) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      let code=this.contract.interface.encodeFunctionData('unitTokenToDaoToken',[0,_amount,_id,this.account])
      let gas1=await this.ethersProvider.provider.estimateGas(this.address,code)
      let gas2=await this.contract.estimateGas.unitTokenToDaoToken(0,_amount,_id,this.account)   
      return this.ethers.utils.formatUnits(gas1.toNumber()+gas2.toNumber(),'gwei')          
   }
   
    /**
     * token-->utoken
     * @param {number} _value token数据
     * @param {int} _id token ID
     * @param {number} _minRatio  滑点值
     * @returns 
     */
    async daoTokenToUnitToken(_value,_id,_minRatio) {
        this.genegateContract()
        let _amount=this.ethers.utils.parseEther(_value+'').toString()
        let min_amount= await this.commulate.daoTokenToUnitToken(_amount,_id);
        let temp= parseFloat(this.ethers.utils.formatEther(min_amount))
        let minratio=this.ethers.utils.parseEther(temp*(1-_minRatio/100)+'')
        let result= await this.contract.daoTokenToUnitToken(minratio,_amount,_id,this.account);
        await result.wait()
        return result;
    }

    async daoTokenToUnitTokenGas(_value,_id) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      let code=this.contract.interface.encodeFunctionData('daoTokenToUnitToken',[0,_amount,_id,this.account])
      let gas1=await this.ethersProvider.provider.estimateGas(this.address,code)
      let gas2=await this.contract.estimateGas.daoTokenToUnitToken(0,_amount,_id,this.account)         
      return this.ethers.utils.formatUnits(gas1.toNumber()+gas2.toNumber(),'gwei')       
  }
  
    /**
     * token-->token
     * @param {number} _value 兑换token 值
     * @param {int} _id1 兑换token ID（from）
     * @param {int} _id2 兑换给 token ID (to)
     * @param {number} _minRatio  滑点值
     * @returns 
     */
    async DaoTokenToDaoToken(_value,_id1,_id2,_minRatio) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      let min_amount= await this.commulate.DaoTokenToDaoToken(_amount,_id1,_id2);
      let temp= parseFloat(this.ethers.utils.formatEther(min_amount))
      let minratio=this.ethers.utils.parseEther(temp*(1-_minRatio/100)+'')
      let result= await this.contract.daoTokenToDaoToken(0, minratio, _amount,_id1,_id2,this.account);
      await result.wait()
      return result;
    }

    async DaoTokenToDaoTokenGas(_value,_id1,_id2) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      let code=this.contract.interface.encodeFunctionData('daoTokenToDaoToken',[0, 0, _amount,_id1,_id2,this.account])
      let gas1=await this.ethersProvider.provider.estimateGas(this.address,code)
      let gas2=await this.contract.estimateGas.daoTokenToDaoToken(0, 0, _amount,_id1,_id2,this.account);
      return this.ethers.utils.formatUnits(gas1.toNumber()+gas2.toNumber(),'gwei')  
    }
  


    async getPool(_id) {
        this.genegateContract()
        let result= await this.contract.pools(_id);
        let utoken=parseFloat(this.ethers.utils.formatEther(result.unit_token_supply))
        let token=parseFloat(this.ethers.utils.formatEther(result.eip3712_supply))
        let price=utoken/token-0.01
        return {utoken,token,price};

    }
   
     
    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }

    constructor(_ethers,_ethersProvider,_account,_commulate,_utoken,_address) {
        this.utoken=_utoken
        this.commulate=_commulate;
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;
        this.abi=iadd_abi.abi
       }
   }
   
   module.exports=IADD