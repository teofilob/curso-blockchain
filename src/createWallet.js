const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//definir a rede
const network = bitcoin.networks.testnet;

//derivacao de carteiras HD
const path = "m/49'/1'/0'/0";


let mnemonic = bip39.generateMnemonic();

let seed = bip39.mnemonicToSeedSync(mnemonic);

let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);

let node = account.derive(0).derive(0);

let btcAdreess = bitcoin.payments.p2pkh({
    pubkey : node.publicKey,
    network : network,
}).address;

console.log("Carteira gerada:");

console.log("Endereco BTC: " , btcAdreess);
console.log("Chave private ", node.toWIF());
console.log("Seed: ", mnemonic);