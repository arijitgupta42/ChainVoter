import "./elliptic-types";
import * as elliptic from "elliptic";
var EC = elliptic.ec;
var ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

//diplaying private key for user to note down to verify vote
console.log();
console.log("Private key: " , privateKey);

//displaying public key for user to note down to verify vote
console.log();
console.log('Public key: ' , publicKey);
