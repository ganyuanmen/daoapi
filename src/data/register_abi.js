const register_abi={abi:[
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
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint128",
        "name": "daoid",
        "type": "uint128"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_manager",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "token",
        "type": "bool"
      }
    ],
    "name": "CreateOrg",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
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
    "inputs": [],
    "name": "appInfo",
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
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "desc",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "manager",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_token",
        "type": "bool"
      },
      {
        "internalType": "uint16",
        "name": "version",
        "type": "uint16"
      },
      {
        "internalType": "uint128",
        "name": "appIndex",
        "type": "uint128"
      },
      {
        "internalType": "address[]",
        "name": "members",
        "type": "address[]"
      },
      {
        "internalType": "uint32[]",
        "name": "votes",
        "type": "uint32[]"
      },
      {
        "internalType": "address[]",
        "name": "cause",
        "type": "address[]"
      }
    ],
    "name": "createOrg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deth",
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
        "name": "_daoid",
        "type": "uint128"
      }
    ],
    "name": "getInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "desc",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "manager",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "token",
            "type": "bool"
          }
        ],
        "internalType": "struct Register.Info",
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
        "internalType": "address",
        "name": "_appInfo",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_deth",
        "type": "address"
      }
    ],
    "name": "init",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "nameToId",
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
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "symbolToId",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "",
        "type": "uint128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]};

 module.exports=register_abi;