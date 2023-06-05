const ethers = require("ethers");

const daoapi = require("./index");



let privateKey = "c62b1a019995284f1fa113df55823ea129afc777d00308924b6ae6f61e7acc73";

let wallet = new ethers.Wallet(privateKey);
let provider = ethers.getDefaultProvider("ropsten");


    let tempWallet = new ethers.Wallet(privateKey,provider)
   
    

const aa = new daoapi(
  ethers,
  tempWallet,
  "0x136ac9c25f4e16acf12d3e613371078aef11c4ae",
  "Ropsten",
  {
    isError: false,
  }
);
debugger;
aa.commulate.utokenToToken(1,7)

//console.log(aa)