const logo_abi=require('../data/DaoLogo_abi');
const JSZip= require('jszip')
const utils=require("../utils")
 /**
  * logo 处理
  */
 class DaoLogo {

    /** 根据daoId获取logo图片
     * @param {int} id daoId
     * @returns 
     */
    async getLogo(id) {
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);
        let re = await this.contract.daoLogos(id);
        let result= await this.get_async_file(re[0],re[1]);
        return {src: result};
    }

   /** 异步处理文件，根据后缀名还原图片的base64编码
    * @param {string} file_type 图片文件后缀名
    * @param {string} bytesStr 图片16进制编码
    * @returns 
    */
   get_async_file(file_type, bytesStr) {
        return new Promise(function (resolve, reject) {
            //16进制的文件编码 转成 Uint8Array格式的数组
            let len = bytesStr.length / 2 - 1;
            let array = new Uint8Array(len);
            for (let k = 0; k < len; k++) {
                array[k] = parseInt(bytesStr.substr(2 + k * 2, 2), 16);
            }
            // 再转成Blob
            let b = new Blob([array]); 

            if (file_type == 'zip') {//解压
                let new_zip = new JSZip();
                new_zip.loadAsync(b)
                    .then(function (mzip) {
                        let fname = Object.keys(mzip.files)[0]; //文件名
                        mzip.file(fname).async("blob").then(blob => {
                            let _a = fname.split('.');
                            let _b = _a[_a.length - 1];
                            if (_b == 'svg') {
                                let reader = new FileReader()
                                reader.addEventListener('loadend', function (e) {
                                    resolve('data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(e.target.result))))
                                })
                                reader.readAsText(blob)
                            } else {
                                var reader11 = new FileReader()
                                reader11.addEventListener('loadend', function (e) {
                                    resolve(e.target.result.replace("application/octet-stream", "image/" + _b));
                                })
                                reader11.readAsDataURL(blob)

                            }

                        });
                    });
            } else {

                var reader11 = new FileReader()
                reader11.addEventListener('loadend', function (e) {
                    resolve(e.target.result.replace("application/octet-stream", "image/" + file_type));
                })
                reader11.readAsDataURL(b)
            }
        });
    }

    /** 首次设置logo
     * @param {int} id  dao ID
     * @param {string} logo  logo 处理后的16进制码
     * @param {string} _type 图片后缀名
     * @returns 
     */
    async setLogo(id, logo,_type) {
        // console.log(id, [_type,logo])
        this.genegateContract()
       // let gasLimit=await utils.estimateGas(this.contract,'initLogo',[id, [_type,logo]],'6400000')
       // console.log(gasLimit)
      //  let result = await this.contract.initLogo(id, [_type,logo],gasLimit);
        let result = await this.contract.initLogo(id, [_type,logo]);
        await result.wait()
        return result
    }
  

    genegateContract(){
        if(!this.contract)  this.contract=new this.ethers.Contract(this.address,this.abi , this.ethersProvider);   
    }
      
    constructor(_ethers,_ethersProvider,_account,_address) {
        this.ethersProvider=_ethersProvider;this.ethers=_ethers;
        this.account=_account;
        this.address=_address;   
        this.abi=logo_abi.abi

    }
}

module.exports=DaoLogo