const deth_abi=require('../data/deth_abi');
/**
 * DETH处理
 */
class Dao_deth
{
 /**
  * 锻造deth
  * @returns 
  */
async  takeRecord() {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let result = await this.contract.takeRecord();
    await result.wait();
    return result;
}

/**
 * 查询未锻造deth余额
 * @param {char[42]} _address 查询人
 * @returns 
 */
async  dEth(_address) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let result = await this.contract.dEth(_address);
    return {address:_address,outAmountWei: result.toString(),outAmount:this.ether.utils.formatEther(result)};
}

/**
 * 查询DETH 余额
 * @param {char[42]} _address 查询人
 * @returns 
 */
async  balanceOf(_address) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let result = await this.contract.balanceOf(_address);
    return {address:_address,outAmountWei: result.toString(),outAmount:this.ether.utils.formatEther(result)};
 
}

// async  setSingle(_address,_lok) {    
//     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
//     let result = await this.contract.setSingle(_address,_lok);
//     await result.wait();
//     return result;
// }


// async  setVersion(_address,_lok) {    
//     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
//     let result = await this.contract.setVersion(_address,_lok);
//     await result.wait();
//     return result;
// }

/**
 * 查询DETH授权信息
 * @param {char[42]} _owneraddress  授权人地址
 * @param {char[42]} _speneraddress 授权地址
 * @returns 
 */
  async allowance(_owneraddress,_speneraddress) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.allowance(_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ether.utils.formatEther(result)};
    }

    
//   async isAllowSingle(_speneraddress) {
//         if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
//         let result= await this.contract.isAllowSingle(_speneraddress);
//         return result;
//     }


/**
 * DETH 授权
 * @param {char[42]} _address 授权地址
 * @param {number} _amount 授权数值
 * @returns 
 */
async  approve(_address,_amount) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    let result = await this.contract.approve(_address,this.ether.utils.parseEther(_amount));
    await result.wait();
    return result;
    }
   

setAddress(_address)
{
    this.address=deth_abi.address;
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
     
        this.abi=deth_abi.abi
    }
}

module.exports=Dao_deth