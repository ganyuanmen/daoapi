
const getInfo_abi = require('../data/GetInfos_abi');

//获取数据 减少http请求
class GetInfos {

    /**获取dao信息
     * @param {int} _id  dao ID
     * @returns 
     */
    async getDaoInfo(_id) {
        this.genegateContract()
        let result= await this.contract.getDaoInfo(_id);
        return result;
    }

   /** 获取 dao 的成员及票权
    * @param {*} _id  dao ID
    * @returns {accounts,votes}
    */
    async  getAccount_Votes(_id) {    
        this.genegateContract()
        let result= await this.contract.getAccount_Votes(_id);
        // let _acar=[]; //成员
        // // let _vtar=[]; //票权
        // for(let i=0;i<result.length;i++)
        // {
        //   //  if(result[i]['account']!=='0x0000000000000000000000000000000000000000') {
        //         _acar.push({account:result[i]["account"],vote:result[i]["vote"],memberIndex:i})
        //   //  }          
        // }
        return result;
    }
    
    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }

    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;
        this.abi=getInfo_abi.abi
    }
}

module.exports = GetInfos