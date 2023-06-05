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
     * @returns 
     */
     async ethToDaoToken(_eth,_id) {

        this.genegateContract()
        let _amount=this.ethers.utils.parseEther(_eth+'')
        let minUtoken= await this.utoken.getOutputAmount(_amount)
        let minDaotoken=await this.commulate.unitTokenToDaoToken(minUtoken[0].toString(),_id)
        // let gasLimit=await utils.estimateGas(this.contract,'ethToDaoToken',[minUtoken[0].toString(),minDaotoken.toString(),_id,this.account,{value: _amount}],'100000')
        //let result= await this.contract.ethToDaoToken(minUtoken[0].toString(),minDaotoken.toString(),_id,this.account,{value: _amount,gasLimit: 6400000,gasPrice: this.ethers.utils.parseUnits('9.0', 'gwei')});
        // let result= await this.contract.ethToDaoToken(minUtoken[0].toString(),minDaotoken.toString(),_id,this.account,{value: _amount,gasLimit: 6400000,gasPrice: this.ethers.utils.parseUnits('2.5', 'gwei')});
        let result= await this.contract.ethToDaoToken(minUtoken[0].toString(),minDaotoken.toString(),_id,this.account,{value: _amount});
        await result.wait();
        return result;
     }
   
     
    /**
     * utoken-->token
     * @param {number} _value utoken 值
     * @param {int} _id  token ID
     * @returns 
     */
    async unitTokenToDaoToken(_value,_id) {
       this.genegateContract()
       let _amount=this.ethers.utils.parseEther(_value+'').toString()
     //  let min_amount= await this.commulate.unitTokenToDaoToken(_amount,_id);
      // let result= await this.contract.unitTokenToDaoToken(min_amount.toString(),_amount,_id,this.account);
      let result= await this.contract.unitTokenToDaoToken(0,_amount,_id,this.account);
       await result.wait();
       return result;
    }
   
    /**
     * token-->utoken
     * @param {number} _value token数据
     * @param {int} _id token ID
     * @returns 
     */
    async daoTokenToUnitToken(_value,_id) {
        this.genegateContract()
        let _amount=this.ethers.utils.parseEther(_value+'').toString()
        let min_amount= await this.commulate.daoTokenToUnitToken(_amount,_id);
        let result= await this.contract.daoTokenToUnitToken(min_amount.toString(),_amount,_id,this.account);
        await result.wait()
        return result;
    }
  
    /**
     * token-->token
     * @param {number} _value 兑换token 值
     * @param {int} _id1 兑换token ID（from）
     * @param {int} _id2 兑换给 token ID (to)
     * @returns 
     */
    async DaoTokenToDaoToken(_value,_id1,_id2) {
      this.genegateContract()
      let _amount=this.ethers.utils.parseEther(_value+'').toString()
      //let tempData= await this.commulate.DaoTokenToDaoToken(_amount,_id1,_id2);

     // let result= await this.contract.daoTokenToDaoToken(tempData[1].toString(), tempData[0].toString(), _amount,_id1,_id2,this.account);
      let result= await this.contract.daoTokenToDaoToken(0, 0, _amount,_id1,_id2,this.account);
      await result.wait()
      return result;
    }
  

    // getReal(v){
    //     var b=v.split('');
    //     for(var i=1;i<b.length;i++)
    //          {
    //              if(b[i]!='0')
    //              break               
    //          }
    //     return v.substr(i);

    // }

    // async getPool(_id) {
    //     if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);
    //     let result= await this.contract.getPool(_id);
    //     return {utoken: this.ethers.utils.formatEther(this.getReal(result.uToken.toString()),'ether'),utokenWei:this.getReal(result.uToken.toString())};
    
    // }
   
     
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