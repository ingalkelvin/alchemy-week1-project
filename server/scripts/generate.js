const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log('public key:', toHex(publicKey));


const newArr = publicKey.slice(1);
const hash = keccak256(newArr); 
const address = hash.slice(hash.length-20);
console.log('Address: ' + toHex(address));