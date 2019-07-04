const {Blockchain,Block} = require('./chainvoter');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.keyFromPrivate('4429c86623f262dd0a6e432e51136a24324466f9b8f11b28ccdfefde256784fd');
let election = new Blockchain();
const voter1 = new Block('voterID','MyName','Aadhaar','NOTA','Kanpur',key.getPublic('hex'),0)
voter1.signVote(key);
election.addBlock(voter1);
//console.log(voter1.isValid());
console.log('\nVoting...\n');
console.log(election.isChainValid());

/*let savejeeCoin = new Blockchain();
const tx1 = new Transaction(myWalletAddress,'public key goes here',10);
tx1.signTransaction(myKey);
savejeeCoin.addTransaction(tx1);
console.log('\n Starting the miner...');
savejeeCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of xavier is', savejeeCoin.getBalanceOfAddress(myWalletAddress));
savejeeCoin.chain[1].transactions[0].amount=10;
console.log('Is chain valid? ', savejeeCoin.isChainValid());
//console.log(savejeeCoin.chain[1].transactions);*/
