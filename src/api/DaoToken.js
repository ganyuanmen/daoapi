const daoToken_abi=require('../data/DaoToken_abi');
const utils=require("../utils")

// DaoToken处理
 class DaoToken
{
    /**
    * 授权查询
    * @param {int} _id token ID
    * @param {number} _amount 授权数额
    * @param {char[42]} _spenneraddress  授权地址
    * @returns 
    */
     async approve(_id,_spenneraddress,_amount)
     {
        this.genegateContract()
        let amount=this.ethers.utils.parseEther(_amount+'')
        let gasLimit=await utils.estimateGas(this.contract,'approve',[_id,_spenneraddress,amount],'100000')
        let tx=  await  this.contract.approve(_id,_spenneraddress,amount,gasLimit);
        await tx.wait();
        return tx;
     }

     
    /** 查询utoken授权信息
     * @param {char[42]} _owneraddress 授权人
     * @param {char[42]} _speneraddress 授权地址
     * @returns 
     */
    async allowances(_id,_owneraddress,_speneraddress) {
        this.genegateContract()
        let result= await this.contract.allowances(_id,_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ethers.utils.formatEther(result)};
    }

    
    
    /**授权查询
    * @param {char[42]} _owneraddress  授权人
    * @param {char[42]} _spenneraddress  授权地址
    * @returns true/false
    */
    async allowanceGlobal(_owneraddress,_spenneraddress)
    {
        this.genegateContract()
        let result= await this.contract.allowanceGlobal(_owneraddress,_spenneraddress);
        return {status:result}; 
    }


     /** token 全局授权,授权一次， 所有token 均被授权
     * @param {char[42]} _spaneraddress 授权地址
     * @param {boolean} _status 授权状态(true/false)
     * @returns 
     */
    async approveGlobal(_spaneraddress,_status) {
        this.genegateContract()
        // let gasLimit=await utils.estimateGas(this.contract,'approveGlobal',[_spaneraddress,_status],'100000')
        let re=  await this.contract.approveGlobal(_spaneraddress,_status);
        await re.wait()
        return re;
    }

    /** 查询token余额
     * @param {int} _id token ID 也叫eip3712_id
     * @param {char[42]} _address 查询人
     * @returns 
     */
    async balanceOf(_id,_address) {
        this.genegateContract()
        let result= await this.contract.balanceOf(_id,_address);
        return {token: this.ethers.utils.formatEther(result),tokenWei:result.toString()};
    }
   
    // /**发布token, 只能发布一次
    //  * @param {int} _id  dao ID
    //  * @returns 
    //  */
    // async issue(_id) {
    //     this.genegateContract()
    //     let result= await this.contract.issue(_id);
    //     await result.wait()
    //     return result;
    // }

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }

    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;
        this.abi=daoToken_abi.abi
    }
}

module.exports=DaoToken