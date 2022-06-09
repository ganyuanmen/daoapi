const erc20s_abi=require('../data/erc20s_abi');
class Dao_erc20s
{
    async getIsIssue(idar) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.getIsIssue(idar);
        return result;
    }

       //全局查询
    async allowanceAll(_owneraddress,_spenneraddress)
    {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.approveAll(_owneraddress,_spenneraddress);
        return {status:result}; 
    }


    //全局授权
    async approveAll(_spaneraddress,_status) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let re=  await  this.contract.functions['approve(address,bool)'](_spaneraddress,_status);
        await re.wait()
        return re;

    }

    async setIADD(_address) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let re=  await  this.contract.setIADD(_address);
        await re.wait()
        return re;
    }
    
    
    async setStatus() {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let re=  await  this.contract.setStatus();
        await re.wait()
        return re;
    }
    
    


    async _getInfo(idar) {

        let result= await this.contract.getInfo(idar);
        return {symbol:result[0].symbol,name:result[0].name,id:result[0].id,manager:result[0].manager};
    }

    async getInfo(_id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this._getInfo([_id]);
        return result;
    }

    async balanceOf(_id,_address) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let result= await this.contract.balanceOf(_id,_address);
        return {token: this.ether.utils.formatEther(result),tokenWei:result.toString()};

    }

    async issue(id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
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
    constructor(_ether,_etherProvider,_selectAccount) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.contract=undefined;
        this.selectedAccount=_selectAccount;
        this.address=erc20s_abi.address;
        this.abi=erc20s_abi.abi
    }
}

module.exports=Dao_erc20s