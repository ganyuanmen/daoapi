const deth_abi=require('../data/deth_abi');
class Dao_deth
{
 
 
async  takeRecord() {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.takeRecord();
    await result.wait();
    return result;
}

async  dEth(_address) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.dEth(_address);
    return {address:_address,outAmountWei: result.toString(),outAmount:this.ether.utils.formatEther(result)};
}

async  balanceOf(_address) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.balanceOf(_address);
    return {address:_address,outAmountWei: result.toString(),outAmount:this.ether.utils.formatEther(result)};
 
}




async  setSingle(_address,_lok) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.setSingle(_address,_lok);
    await result.wait();
    return result;
}


async  setVersion(_address,_lok) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.setVersion(_address,_lok);
    await result.wait();
    return result;
}


  async allowance(_owneraddress,_speneraddress) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.allowance(_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ether.utils.formatEther(result)};
    }

    
  async isAllowSingle(_speneraddress) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.isAllowSingle(_speneraddress);
        return result;
    }



async  approve(_address,_amount) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
    let result = await this.contract.approve(_address,this.ether.utils.parseEther(_amount));
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

    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.selectedAccount=_selectAccount;
        this.contract=undefined;    

        this.address=deth_abi.address;
     
        this.abi=deth_abi.abi
    }
}

module.exports=Dao_deth