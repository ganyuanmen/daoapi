
#  道易程前端api（daoapi@1.0.13）

daoapi 是一个专门用于操作 dao 合约的api， 封装了与智能合约交互的操作过程。让用户以函数的方式直接调用以太坊的智能合约。
实体类 :
- Org 管理类 (对象实例：org)
- Os 管理类 (对象实例：os)
- IADD 币值兑换 (对象实例：iadd)
- Tokens 处理 (对象实例：tokens)
- Utoken 处理 (对象实例：utokenr)
- Eth 兑换token (对象实例：ethToToken)
- Commulate 兑换值查询 (对象实例：commulate)
- Logo 图片处理 (对象实例：logo)
- Deth 回收utoken (对象实例：deth)
- Vote 提案管理类 (对象实例：vote)

> 具体的使用方法参见左边菜单信息


## 安装 daoapi
```js
npm install daoapi

或

yarn add daoapi

```

## 安装依赖包
 > daoapi 依赖 web3.js 和 jszip.js, 需要安装依赖包

```js
npm install web3 或 yarn add web3
npm install jszip 或 yarn add jszip
```

## 引用

 ```js
 import Web3 from "web3"; 或 const Web3 = require('web3')
 import Daoapi from "daoapi" 或 const Daoapi=require("daoapi")
 ```


使用web3 连接到以太坊服务器后， 执行：
```js
 let daoapi=new Daoapi(web3,selectedAccount,'Ropsten') //selectedAccount 用户钱包地址 Ropsten:连接Ropsten网络

```

## webpack 项目使用示例
```js
import Web3 from "web3";
import Web3Modal from "web3modal";
import Daoapi from "daoapi"

var web3,selectAcouunt;

//连接钱包
async function connect() {
  const providerOptions = {  // 空对象，默认使用metamask 
     // walletconnect: {
       //   package: WalletConnectProvider,
       //   options: {
        //      infuraId: "9676a35d629d488fb90d7eac1348c838"
        //  }
   //   }
  };

  const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
      disableInjectedProvider: false
  });

  const provider = await web3Modal.connect();
  return provider;
}

function onConnect() {

  const daoapi = new Daoapi(web3, selectAcouunt,'Ropsten');
  console.log(daoapi.version)

  //默认合约地址是ropsten测试网络地址，
  //修改地址：
  //daoapi.commulate.setAddress("0x.....")
  //daoapi.utoken.setAddress("0x.....")
  daoapi.org.getOrg(org_id).then(e => {
      console.log("----------getOrg---------------------")
      console.log(e);

  })

  daoapi.logo.setLogoEvent(11422899,data=>{ //从11422899 块号开始监听

      console.log(data);
      // do something 

  })
}

connect().then(provider => {

  web3 = new Web3(provider);
  web3.eth.getAccounts().then(accounts => {
      selectAcouunt = accounts[0];
      onConnect();
  })

})


```
## html 使用示例
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>daoapi demo</title>
        <script src='web3.min.js'></script>
        <script src='web3model.js'></script>
        <script src='daoApi.js'></script>     
    </head>
    <body> 
    </body> 
</html>
<script>

var Web3Modal = window.Web3Modal.default;
var WalletConnectProvider = window.WalletConnectProvider.default;
var Daoapi = window.Daoapi.default;
var web3, selectAcouunt;
window.addEventListener('load', async () => {
    connect().then(provider => {
        web3 = new Web3(provider);
        web3.eth.getAccounts().then(accounts => {
            selectAcouunt = accounts[0];
            onConnect();
        })

    })
});

function onConnect() {

    const daoapi = new Daoapi(web3, selectAcouunt,,'Ropsten');
    console.log(daoapi.version)
    daoapi.org.getOrg(org_id).then(e => {
        console.log("----------getDaos---------------------")
        console.log(e);

    })
    daoapi.logo.setLogoEvent(11422899, data => { //从11422899 块号开始监听

        console.log(data);
        // do something 

    })
}

async function connect() {
    const providerOptions = {  // 空对象，默认使用metamask 
       // walletconnect: {
        //    package: WalletConnectProvider,
       //     options: {
        //        infuraId: "9676a35d629d488fb90d7eac1348c838"
        //    }
     //   }
    };

    const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        disableInjectedProvider: false
    });

    const provider = await web3Modal.connect();
    return provider;
}

</script>
```
## nodejs 使用示例
```js
const Web3 = require('web3')
const Daoapi=require("daoapi")

var web3 = new Web3('wss://ropsten.infura.io/ws/v3/63aa34e959614d01a9a65d3f93b70e66')
var selectAcouunt='0x75EFcbeC4961D6FD3B77F271ce9e5cb7458cb69E'

const daoapi = new Daoapi(web3, selectAcouunt);
console.log("daoapi version:"+daoapi.version)

daoapi.org..getOrg(org_id).then(e => {
  console.log("----------getDaos---------------------")
  console.log(e);

})

daoapi.logo.setLogoEvent(11422899,data=>{ //从11422899 块号开始监听
  console.log(data);
  // do something 

})

```


