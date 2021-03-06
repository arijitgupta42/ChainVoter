const {Blockchain,Block} = require('./chainvoter');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key1 = ec.keyFromPrivate('a3881e6a35000cf9152935aaae96dddc2f40ca3c5015bd11e97ea4f7dbbb72ea');
publicKey1= key1.getPublic('hex');

const key2 = ec.keyFromPrivate('a3781e6a35000cf9152935aaae96dddc2f40ca3c5015bd11e97ea4f7dbbb72ea');
publicKey2= key2.getPublic('hex');

let election = new Blockchain();
const voter1 = new Block('voterID','MyName','Aadhaar','NOTA','Kanpur',publicKey1,0)
voter1.signVote(key1);

election.addBlock(voter1);

console.log(voter1.isValid());
console.log('Voting...');
console.log("Voter 1 has voted successfully!")

const voter2 = new Block('voterID','MyName','Aadhaar','NOTA','Delhi',publicKey2,0)
voter2.signVote(key2);

election.addBlock(voter2);
console.log(voter2.isValid());
console.log('Voting...');
console.log("Voter 2 has voted successfully");

//on un-commenting the code below it can be seen that on a duplicate signature block isn't added to the chain

/*const voter3 = new Block('voterID','MyName','Aadhaar','NOTA','Pune',publicKey1,0)
voter3.signVote(key1);

election.addBlock(voter3);
console.log(voter3.isValid());
console.log('Voting...');
console.log("Voter 3 has voted successfully");


console.log(election.isChainValid());
*/

console.log(election);
