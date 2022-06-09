const logo_abi=require('../data/logo_abi');
const JSZip= require('jszip')

 class Dao_logo {
    async getLogo(id) {
        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        let re = await this.contract.getFile(id);
        let result= await this._getLogo(re[0],re[1]);
        return {src: result};
    }

    async _getLogo(_type,_fileStr) {
     
        let result = await this.get_real_file(_type,_fileStr); 
        return result;
    }

    get_real_file(file_type,bytesStr) {

        let p = new Promise(function (resolve, reject) {

            let len = bytesStr.length / 2 - 1;
            let array = new Uint8Array(len);
            for (let k = 0; k < len; k++) {
                array[k] = parseInt(bytesStr.substr(2 + k * 2, 2), 16);
            }
            let b = new Blob([array]);
            if (file_type == 'zip') {
                let new_zip = new JSZip();
                new_zip.loadAsync(b)
                    .then(function (mzip) {
                        let fname = Object.keys(mzip.files)[0];
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

        return p
    }

    async setLogo(id, logo,_type) {

        if(!this.contract)  this.contract=new this.ether.Contract(this.address,this.abi , this.etherProvider.getSigner(0));
        const _gas = await this.contract.estimateGas.setLogo(id, logo, _type);
        let result = await this.contract.setLogo(id, logo, _type,{gasLimit:parseInt(_gas.toString())+400000});
        await result.wait()
        return result
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

        this.address=logo_abi.address;   
        this.abi=logo_abi.abi

    }
}

module.exports=Dao_logo