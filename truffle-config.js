require('dotenv').config();
const request = require('sync-request');
const web3 = require('web3');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const ethgasstation = "https://ethgasstation.info/api/ethgasAPI.json";

let mainnetGasPrice = 10;
try {
  const res = request('GET', ethgasstation);
  // Unit is 10*gwei
  mainnetGasPrice = (JSON.parse(res.getBody('utf8')).average / 10).toString();
  console.log("Gas price: " + mainnetGasPrice);
} catch {
  console.log("Unable to fetch gas prices.");
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 8000000,
      gasPrice: 1000000000, // web3.eth.gasPrice
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/v3/` + process.env.INFURA_API_KEY),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 1223446,
      gasPrice: web3.utils.toWei(mainnetGasPrice, 'gwei'),
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  plugins: [
    'truffle-plugin-verify'
  ],
  
  api_keys: {
    etherscan: 'ADTFHADWBNDKXEUD4I3U9ZVPQYTYG9VAJA'
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.2",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    },
  },
};
