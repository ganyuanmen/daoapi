const register_abi=require('../data/register_abi');
const org_abi=require('../data/org_abi');
/**
 * 注册dao
 */
class Dao_register
{
   /**
   * 注册dao
   * @param {string} _name dao名称
   * @param {string} _symbol  dao符号
   * @param {string} _desc dao描述
   * @param {char[42]} _manager 管理人地址
   * @param {boolean} _token 是否允许发行token
   * @param {int} _version 版本号 固定为1
   * @param {int} _appIndex app序号 固定为1
   * @param {Array[char[42]]} _members 成员列表
   * @param {Array[int]} _votes  票权列表
   * @param {char[42]} _cause app执行地址，备用
   * @returns 
   */
async  createOrg(_name, _symbol,_desc, _manager, _token,_version,_appIndex, _members,_votes, _cause) {    
    if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
    const _gas = await this.contract.estimateGas.createOrg(_name, _symbol,_desc, _manager, _token,_version,_appIndex, _members,_votes, _cause);
    let result = await this.contract.createOrg(_name, _symbol,_desc,_manager, _token,_version,_appIndex, _members,_votes, _cause,{gasLimit:parseInt(_gas.toString())+400000});
    await result.wait();
    return result;
}

// async  init(_address1,_address2) {    
//     if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
//    let result = await this.contract.init(_address1,_address2,{gasLimit:'6400000'});
//     await result.wait();
//     return result;
// }


// async  get_A_V(_id,_address) {    
//     let _contract=new this.ether.Contract(_address,org_abi.abi , this.etherProvider);
//     let result=await _contract.getAccounts_Votes();
//     let _acar=[];
//     let _vtar=[];
//     for(let i=0;i<result.length;i++)
//     {
//         if(parseInt(result[i]['vote'])>0) {
//          _acar.push(result[i]["account"])
//          _vtar.push(result[i]["vote"])
//         } else break;
         
//     }
   
//     return {accounts:_acar,votes:_vtar};
// }

// async  getInfo(_id) {    
//      if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider);
//      let result = await this.contract.getInfo(_id);
//      return result;
// }

//     async getDaoInfo(_id)
//     {
//         let _info=await  this.getInfo(_id)
//         if(_info.name==="") {
//             return   {
//                 daoId:0,
//                 manager:'',
//                 name:'',
//                 symbol:'',
//                 describe:'',
//                 accounts_votes:[]
//             }
//         }
//         let _address=await this.valuec.getOrg(_id);
        
//         let _accounts_votes= await this.get_A_V(_id,_address)
//         return   {
//             daoId:_id,
//             manager:_info.manager,
//             name:_info.name,
//             symbol:_info.symbol,
//             describe:_info.desc,
//             accounts_votes:_accounts_votes
//         }
//     }
  
   setAddress(_address)
    {
        this.address=_address;
    }
    setAbi(_abi)
    {
        this.abi=_abi;
    }

    constructor(_ether,_etherProvider,_selectAccount,valuec,_address) {
        this.etherProvider=_etherProvider;this.ether=_ether;
        this.valuec=valuec
        this.selectedAccount=_selectAccount;
        this.contract=undefined;        
        this.address=_address;
        this.abi=register_abi.abi
    }
}

module.exports=Dao_register