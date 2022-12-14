const erc20s_abi=require('../data/erc20s_abi');
/**
 * token处理
 */
class Dao_erc20s
{

    // async getIsIssue(idar) {
    //     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    //     let result= await this.contract.getIsIssue(idar);
    //     return result;
    // }

       
       /**
        * 授权查询
        * @param {char[42]} _owneraddress  授权人
        * @param {char[42]} _spenneraddress  授权地址
        * @returns true/false
        */
    async allowanceAll(_owneraddress,_spenneraddress)
    {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.approveAll(_owneraddress,_spenneraddress);
        return {status:result}; 
    }


     /**
     *  token 全局授权,授权一次， 所有token 均被授权
     * @param {char[42]} _spaneraddress 授权地址
     * @param {boolean} _status 授权状态(true/false)
     * @returns 
     */
    async approveAll(_spaneraddress,_status) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let re=  await  this.contract.functions['approve(address,bool)'](_spaneraddress,_status);
        await re.wait()
        return re;

    }

    // async setIADD(_address) {
    //     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    //     let re=  await  this.contract.setIADD(_address);
    //     await re.wait()
    //     return re;
    // }
    
    
    // async setStatus() {
    //     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    //     let re=  await  this.contract.setStatus();
    //     await re.wait()
    //     return re;
    // }
    
    


    // async _getInfo(idar) {

    //     let result= await this.contract.getInfo(idar);
    //     return {symbol:result[0].symbol,name:result[0].name,id:result[0].id,manager:result[0].manager};
    // }

    // async getInfo(_id) {
    //     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    //     let result= await this._getInfo([_id]);
    //     return result;
    // }

    /**
     * 查询token余额
     * @param {int} _id token ID
     * @param {char[42]} _address 查询人
     * @returns 
     */
    async balanceOf(_id,_address) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.balanceOf(_id,_address);
        return {token: this.ether.utils.formatEther(result),tokenWei:result.toString()};

    }
   
    /**
     * 发布token, 只能发布一次
     * @param {int} id  dao ID
     * @returns 
     */
    async issue(id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.issue(id);
        await result.wait()
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
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=_address;
        this.abi=erc20s_abi.abi
    }
}

module.exports=Dao_erc20s