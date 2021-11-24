
'use strict';
const  JSZip= require('jszip')

 class LogoNodejs {
    async getLogo(id) {
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, { from: this.selectedAccount });
        let re = await this.contract.methods.getFile(id).call({ from: this.selectedAccount });
        let result = await this._getLogo(re[0], re[1]);
        return { src: result };
    }
    async _getLogo(_type, _fileStr) {

        let result = await this.get_real_file(_type, _fileStr);
        return result;
    }


    get_real_file(file_type, bytesStr) {

        let p = new Promise(function (resolve, reject) {
            let len = bytesStr.length / 2 - 1;
            let array = new Uint8Array(len);
            for (let k = 0; k < len; k++) {
                array[k] = parseInt(bytesStr.substr(2 + k * 2, 2), 16);
            }
            if (file_type == 'zip') {
             
                let new_zip = new JSZip();

                new_zip.loadAsync(Buffer.from(array.buffer))
                    .then(function (mzip) {

                        let fname = Object.keys(mzip.files)[0];

                        mzip.file(fname).async("nodebuffer").then(blob => {
                            let _a = fname.split('.');
                            let _b = _a[_a.length - 1];
                            if (_b == 'svg') {
                                resolve('data:image/svg+xml;base64,' + blob.toString('base64'))
                            } else {
                                resolve('data:image/' + _b + ';base64,' + blob.toString('base64'))
                            }

                        });
                    });

            } else {
                resolve('data:image/' + file_type + ';base64,' + Buffer.from(array.buffer).toString('base64'))
            }
        });
        return p
    }

    async _setLogo(id, logo, _type) {

        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, { from: this.selectedAccount });
        let result = await this.contract.methods.setLogo(id, logo, _type).send({ from: this.selectedAccount });
        return result

    }
    async setLogo(id, _file) {
        let para = await this.setLogo1(id, _file);
        let result = await this._setLogo(id, para.logo, para.type);
        return result;
    }

    setLogo1(id, _file) {
        let type = _file.name.toLowerCase().split('.').splice(-1);
        let p = new Promise(function (resolve, reject) {
            let reader1 = new FileReader();
            reader1.addEventListener('loadend', function (e) {
                let mbytes = '0x';
                for (let j = 0; j < e.target.result.length; j++) {
                    let _a = e.target.result[j].valueOf().charCodeAt(0).toString(16);
                    mbytes = mbytes + (_a.length == 1 ? ('0' + _a) : _a);
                }
                resolve({ type: type[0], logo: mbytes })
            });
            reader1.readAsBinaryString(_file);
        });
        return p;
    }

    async _changeLogo(id, logo, _type) {
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, { from: this.selectedAccount });
        let result = await this.contract.methods.changeLogo(id, logo, _type).send({ from: this.selectedAccount });
        return result;

    }
    async changeLogo(id, _file) {

        let para = await this.setLogo1(id, _file);
        let result = await this._changeLogo(id, para.logo, para.type);
        return result;

    }

    setLogoEvent(maxBlockNumber, callbackFun) {
        const _this = this;
        _this.setMaxBlock = maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, { from: this.selectedAccount });
        this.contract.events.SetLogo({
            filter: {},
            fromBlock: _this.setMaxBlock, toBlock: 'latest'
        }, function (_error, data) {

            if (data.blockNumber > _this.setMaxBlock) {
                _this.getLogo(data.returnValues.id).then(e => {
                    callbackFun.call(null, {
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "data": {
                            "daoId": data.returnValues.id,
                            "src": e.src,
                            "timestamp": data.returnValues.time
                        },
                        "event": "setLogoEvent"
                    })
                    _this.setMaxBlock = data.blockNumber;
                })

            }
        })

    }
    changeLogoEvent(maxBlockNumber, callbackFun) {
        const _this = this;
        _this.changeMaxBlock = maxBlockNumber;
        if (!this.contract) this.contract = new this.web3.eth.Contract(this.abi, this.address, { from: this.selectedAccount });
        this.contract.events.ChangeLogo({
            filter: {},
            fromBlock: _this.changeMaxBlock,
        }, function (_error, data) {

            if (data.blockNumber > _this.changeMaxBlock) {
                _this.getLogo(data.returnValues.id).then(e => {
                    callbackFun.call(null, {
                        "address": data.address,
                        "blockHash": data.blockHash,
                        "blockNumber": data.blockNumber,
                        "transactionHash": data.transactionHash,
                        "transactionIndex": data.transactionIndex,
                        "data": {
                            "daoId": data.returnValues.id,
                            "src": e.src,
                            "timestamp": data.returnValues.time
                        },
                        "event": "changeLogoEvent"
                    })
                    _this.changeMaxBlock = data.blockNumber;
                })

            }
        })

    }



    setAddress(_address) {
        this.address = _address;
    }
    setAbi(_abi) {
        this.abi = _abi;
    }
    constructor(_web3, _selectAccount) {
        this.web3 = _web3;
        this.contract = undefined;
        this.setMaxBlock = 0;
        this.changeMaxBlock = 0;
        this.selectedAccount = _selectAccount;
        this.address = '0x973369d6E1c51d04eB21455E2de5B1435df34510';
        this.abi = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_register",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_global",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "ChangeLogo",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint32",
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "SetLogo",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_logo",
                        "type": "bytes"
                    },
                    {
                        "internalType": "string",
                        "name": "_fileType",
                        "type": "string"
                    }
                ],
                "name": "changeLogo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "_index",
                        "type": "uint32"
                    }
                ],
                "name": "getFile",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "fileType",
                                "type": "string"
                            },
                            {
                                "internalType": "bytes",
                                "name": "fileContent",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct Logo.file",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "global",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "register",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "id",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_logo",
                        "type": "bytes"
                    },
                    {
                        "internalType": "string",
                        "name": "_fileType",
                        "type": "string"
                    }
                ],
                "name": "setLogo",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]

    }
}

module.exports=LogoNodejs