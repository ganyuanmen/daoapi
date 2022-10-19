const appInfo_abi={abi:[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_global",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_allApp",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_register",
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
        "internalType": "uint128",
        "name": "appNumber",
        "type": "uint128"
      },
      {
        "indexed": true,
        "internalType": "uint128",
        "name": "infosIndex",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      }
    ],
    "name": "Install",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "appIndex",
        "type": "uint256"
      }
    ],
    "name": "Recover",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "appIndex",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "newApp",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      }
    ],
    "name": "Replace",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "appIndex",
        "type": "uint256"
      }
    ],
    "name": "UnInstall",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "appIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      }
    ],
    "name": "Update",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "allApp",
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "delToIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_app",
        "type": "address"
      }
    ],
    "name": "getAddress",
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
        "internalType": "address",
        "name": "_app",
        "type": "address"
      }
    ],
    "name": "getDaoID",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      }
    ],
    "name": "getInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint16",
            "name": "version",
            "type": "uint16"
          },
          {
            "internalType": "uint32",
            "name": "index",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "delegate",
            "type": "address"
          }
        ],
        "internalType": "struct AppInfoGlobal.info",
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
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      }
    ],
    "name": "install",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "installIndexs",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      }
    ],
    "name": "isAllow",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      }
    ],
    "name": "recover",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "_version",
        "type": "uint16"
      }
    ],
    "name": "replace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "index",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      }
    ],
    "name": "setOrg",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      }
    ],
    "name": "stop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      }
    ],
    "name": "uninstall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      },
      {
        "internalType": "uint128",
        "name": "daoIndex",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      }
    ],
    "name": "update",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]};

 module.exports=appInfo_abi;