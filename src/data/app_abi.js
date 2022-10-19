const app_abi={abi:[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "indexRec",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "manager",
        "type": "address"
      }
    ],
    "name": "AddApp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "appNum",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "rec",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "version",
        "type": "uint256"
      }
    ],
    "name": "AddVersion",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "desc",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "addApp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "desc",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "addVersion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint128",
        "name": "_index",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
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
        "internalType": "uint256",
        "name": "_num",
        "type": "uint256"
      }
    ],
    "name": "getAppInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "manager",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "desc",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "versions",
            "type": "uint16"
          },
          {
            "internalType": "uint256[]",
            "name": "infos",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct App.appVersion",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_num",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "_versionNum",
        "type": "uint16"
      }
    ],
    "name": "getVersionInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "desc",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "internalType": "struct App.appInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "index",
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
        "name": "_index",
        "type": "uint128"
      },
      {
        "internalType": "uint16",
        "name": "_version",
        "type": "uint16"
      }
    ],
    "name": "isValid",
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
    "inputs": [],
    "name": "nextAppInfos",
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
    "inputs": [],
    "name": "nextApps",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]};

 module.exports=app_abi;