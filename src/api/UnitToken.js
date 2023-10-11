const uToken_abi=require('../data/UnitToken_abi');
const utils=require('../utils')

 //utoken 处理类
 class UnitToken
{
    /**
     * @returns 查询 ETH 兑换 utoken 的单价
     */
    async getPrice() {
        this.genegateContract()
        let result= await this.contract.highestPriceInHistory();
        return {priceWei:this.ethers.utils.parseEther(result.toString()).toString(),price:result.toString()};
    }

    /** 查询utoken余额
     * @param {char[42]} _address 查询人
     * @returns 
     */
    async balanceOf(_address) {
        this.genegateContract()
        let result= await this.contract.balanceOf(_address);
        return {utoken: this.ethers.utils.formatEther(result),utokenWei:result.toString()};
    }

    
    /** 查询ethTotoken 的最小值
     * @param {int} _eth 
     * @returns 
     */
    async getOutputAmount(_ethWei) {
        this.genegateContract()
        return await this.contract.getOutputAmount(_ethWei);
    }


    /** 查询utoken授权信息
     * @param {char[42]} _owneraddress 授权人
     * @param {char[42]} _speneraddress 授权地址
     * @returns 
     */
    async allowance(_owneraddress,_speneraddress) {
        this.genegateContract()
        let result= await this.contract.allowance(_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ethers.utils.formatEther(result)};
    }

    /** utoken 授权
     * @param {char[42]} _spaneraddress 授权地址
     * @param {number} _amount 授权数量
     * @returns 
     */
    async  approve(_spaneraddress,_amount) {
        this.genegateContract()
        let amount=this.ethers.utils.parseEther(_amount+'')
       // let gasLimit=await utils.estimateGas(this.contract,'approve',[_spaneraddress,amount],'100000')
       // let tx=  await  this.contract.approve(_spaneraddress,amount,gasLimit);
       let tx=  await  this.contract.approve(_spaneraddress,amount);
        await tx.wait();
        return tx;
    }

    /**
     * eth 兑换 utoken 把携带的eth兑换为utoken 指定eth
     * @param {address} _to  兑换给的地址
     * @param {address} _ethValue 兑换的eth数量
     * @returns 
     */
    async swap(_to,_ethValue) {
        this.genegateContract()
        let ethValue=this.ethers.utils.parseEther(_ethValue+'')
       // let gasLimit=await utils.estimateGas(this.contract,'swap',[_to,{value: ethValue}],'100000')
       // let tx = await this.contract.swap(_to,{value: ethValue,...gasLimit});
       let tx = await this.contract.swap(_to,{value: ethValue});
        await tx.wait();
        return tx;
    }
      
    async swapGas(_to,_ethValue) {
        console.log(_to,_ethValue)
        this.genegateContract()
        let ethValue=this.ethers.utils.parseEther(_ethValue+'')
        let code=this.contract.interface.encodeFunctionData('swap',[_to])
        let gas1=await this.ethersProvider.provider.estimateGas(this.address,code)
        let gas2=await this.contract.estimateGas.swap(_to,{value: ethValue});
        return this.ethers.utils.formatUnits(gas1.toNumber()+gas2.toNumber(),'gwei')          
    }

    // /**
    //  * eth 兑换 utoken 指定utoken
    //  * @param {address} _to 
    //  * @param {address} _utoken  得到utoken数量
    //  * @returns 
    //  */
    // async swapExactUnitToken(_to,_utoken) {
    //     this.genegateContract()
    //     let utoken=this.ethers.utils.parseEther(_utoken+'')
    //    // let gasLimit=await utils.estimateGas(this.contract,'swapExactUnitToken',[_to,utoken],'100000')
    //    // let tx = await this.contract.swapExactUnitToken(_to,utoken,gasLimit);
    //    let tx = await this.contract.swapExactUnitToken(_to,utoken);
    //     await tx.wait();
    //     return tx;
    // }

    /** GasToken 兑换 utoken 指定GasToken
     * @param {address} _to 
     * @param {address} _gasToken  
     * @returns 
     */
    async swapByGasToken(_to,_gasToken) {
        this.genegateContract()
        let gasToken=this.ethers.utils.parseEther(_gasToken+'')
        //let gasLimit=await utils.estimateGas(this.contract,'swapByGasToken',[_to,gasToken],'100000')
        //let tx = await this.contract.swapByGasToken(_to,gasToken,gasLimit);
        let tx = await this.contract.swapByGasToken(_to,gasToken);
        await tx.wait();
        return tx;
    }
   
    //   /**
    //  * GasToken 兑换 utoken 指定utoken
    //  * @param {address} _to 
    //  * @param {address} _utoken  得到utoken数量
    //  * @returns 
    //  */
    // async swapExactUnitTokenByGasToken(_to,_utoken) {
    //     this.genegateContract()
    //     let utoken=this.ethers.utils.parseEther(_utoken+'')
    //    // let gasLimit=await utils.estimateGas(this.contract,'swapExactUnitTokenByGasToken',[_to,utoken],'100000')
    //    // let tx = await this.contract.swapExactUnitTokenByGasToken(_to,utoken,gasLimit);
    //     let tx = await this.contract.swapExactUnitTokenByGasToken(_to,utoken);
    //     await tx.wait();
    //     return tx;
    // }

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }
    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;
        this.abi=uToken_abi.abi
      }
  }
  
  module.exports=UnitToken