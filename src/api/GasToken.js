const gasToken_abi=require('../data/GasToken_abi');
const utils=require("../utils")

// GasToken处理
class GasToken
{
    /** 锻造GasToken
     * @param {char[42]} _receiver  锻造地址
     * @param {char[42]} _owner   set_isAllowNonDelegatorMint 和set_isAllowDelegatorMint设置的地址
     * @returns 
     */
    async  startRecord(_receiver,_owner) {    
        this.genegateContract()
        let gasLimit=await utils.estimateGas(this.contract,'startRecord',[_receiver,_owner],'100000')
        let result = await this.contract.startRecord(_receiver,_owner,gasLimit);
        await result.wait();
        return result;
    }
       
        
    /**查询GasToken授权信息
     * @param {char[42]} _owneraddress  授权人地址
     * @param {char[42]} _speneraddress 授权地址
     * @returns 
     */
    async allowance(_owneraddress,_speneraddress) {
        this.genegateContract()
        let result= await this.contract.allowance(_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ethers.utils.formatEther(result)};
    }

    /** GasToken 授权
    * @param {char[42]} _address 授权地址
    * @param {number} _amount 授权数值
    * @returns 
    */
    async  approve(_address,_amount) {    
        this.genegateContract()
        let amount=this.ethers.utils.parseEther(_amount+'')
        let gasLimit=await utils.estimateGas(this.contract,'approve',[_address,amount],'100000')
        let result = await this.contract.approve(_address,amount,gasLimit);
        await result.wait();
        return result;
    }


    /** 查询GasToken余额
     * @param {char[42]} _address 查询地址
     * @returns 
     */
    async  balanceOf(_address) {    
        this.genegateContract()
        let result = await this.contract.balanceOf(_address);
        return {address:_address,outAmountWei: result.toString(),outAmount:this.ethers.utils.formatEther(result)};
    }

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }

    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;
        this.abi=gasToken_abi.abi
    }
}

module.exports=GasToken