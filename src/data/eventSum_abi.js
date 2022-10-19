const eventSum_abi={abi:[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voteDel",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "daoId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_msg",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "time",
        "type": "uint64"
      }
    ],
    "name": "AddPro",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voteDel",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "index",
        "type": "bytes32"
      }
    ],
    "name": "Exec",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_org",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint16",
        "name": "index",
        "type": "uint16"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "_vote",
        "type": "uint32"
      }
    ],
    "name": "SetAccount",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voteDel",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "power",
        "type": "uint256"
      }
    ],
    "name": "VoteTo",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "daoId",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "_msg",
        "type": "address"
      }
    ],
    "name": "addPro",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "index",
        "type": "bytes32"
      }
    ],
    "name": "exec",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "index",
        "type": "uint16"
      },
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "_vote",
        "type": "uint32"
      }
    ],
    "name": "setAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "power",
        "type": "uint256"
      }
    ],
    "name": "voteTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]};

 module.exports=eventSum_abi;