const uToken_abi=require('../data/uToken_abi');
 class Dao_uToken
{
    async getEthToNDAOInputPrice(_value) {
        let _eth=this.ether.utils.parseEther(_value+'');
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.addethToNDAOInputPrice(_eth);
        return {inAmount:_value+'',outAmount: this.ether.utils.formatEther(result[0].toString()),inAmountWei:_eth.toString(),outAmountWei:result[0].toString()};
    }

    async getPrice() {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.highestPrice();
        // console.log(result.toString())
        // let _a = result.toString().split('').reverse();
        // let _b = _a.length
        // if (_a.length < 8) {
        //     for (let i = 0; i < 8 - _b; i++) {
        //         _a.push('0');
        //     }
        // }
        // _a.splice(8, 0, ".")
        // if (_a[_a.length - 1] == '.') {
        //     _a.push('0')
        // }
        // let _c = _a.reverse().join('');

        
        return {priceWei:this.ether.utils.parseEther(result.toString()).toString(),price:result.toString()};
    }

    async balanceOf(_address) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.balanceOf(_address);
        return {utoken: this.ether.utils.formatEther(result),utokenWei:result.toString()};
    }

    async allowance(_owneraddress,_speneraddress) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let result= await this.contract.allowance(_owneraddress,_speneraddress);
        return {approveSumWei: result.toString(),approveSum:this.ether.utils.formatEther(result)};
    }


    async  approve(_spaneraddress,_amount) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let tx=  await  this.contract.functions['approve(address,uint256)'](_spaneraddress,this.ether.utils.parseEther(_amount));
        await tx.wait();
        return tx;
    }

    async swap(v) {
      if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let tx = await this.contract.swap({value: this.ether.utils.parseEther(v+'')});
        await tx.wait();
        return tx;
    }
      
    async swapDETHTo(_address,_shu) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
        let tx=  await  this.contract.functions['swapDETHTo(address,uint256)'](_address,this.ether.utils.parseEther(_shu+'').toString());
        await tx.wait();
        return tx;

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
      
        this.abi=uToken_abi.abi

      }
  }
  
  module.exports=Dao_uToken