const logo_abi={abi:[
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
]};
 module.exports=logo_abi;