const EC = require('elliptic').ec;
const ec = new EC("secp256k1");

//generating the key which consists of public key and private key
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

//diplaying private key for user to note down to verify vote
console.log();
console.log("Private key: " , privateKey);

//displaying public key for user to note down to verify vote
console.log();
console.log('Public key: ' , publicKey);
