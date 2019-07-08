const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC("secp256k1");

//creating block for each vote counted with details of voter
class Block{
	constructor(fromVoterID, fromName, fromAadhaar, toParty, constituency, publicKey,previousHash=''){
		this.fromVoterID = fromVoterID;
		this.fromName = fromName;
		this.fromAadhaar = fromAadhaar;
		this.toParty = toParty;
		this.constituency = constituency;
		this.timestamp = Date.now();
		this.previousHash = previousHash;
		this.publicKey = publicKey;
		this.hash = this.calculateHash();
		this.nonce = 0;
    	
	}

	//calculating hash for each vote
	calculateHash(){
		return SHA256(this.fromAadhaar + this.fromName + this.fromVoterID + this.toParty + this.timestamp + this.publicKey + this.previousHash + this.nonce).toString();
	}

	//calculating hash for signing purpose
	calculateHashSig(){
		return SHA256(this.fromAadhaar + this.fromName + this.fromVoterID + this.publicKey).toString();
	}

	//mining the vote based on difficulty
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined :" + this.hash);
	}
	signVote(signingKey){
		if(signingKey.getPublic('hex')!== this.publicKey){
			throw new Error('You cannot vote from other devices! ');

		}
		const hashVt = this.calculateHashSig();
		const sig = signingKey.sign(hashVt,'base64');
		this.signature = sig.toDER('hex');
	}

	isValid(){
		
		if(!this.publicKey || !this.fromAadhaar || !this.toParty ){   //required fields
			return false;
		}
		if(!this.signature || this.signature.length === 0){		//must be signed
			throw new Error('No signature in this vote!');
		}
		const keyPub = ec.keyFromPublic(this.publicKey,'hex');
		return keyPub.verify(this.calculateHashSig(),this.signature);    //!!!! returning false while it should be true

	}
}

class Blockchain{
	//default constructor that initiates genesis block creation function
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
	}

	//function that creates genesis block
	createGenesisBlock(){
		return new Block('Genesis Block', null,null,null,null);
	}

	//returns the last vote added to the blockchain
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	//check if same signature exists in another block in the chain
	checkBlock(newBlock){
		for( let i=1; i<this.chain.length;i++){
			const currentBlock = this.chain[i];
			if(currentBlock.signature === newBlock.signature){
				return true;
			}
		}
		return false;
	}

	//adds a new vote to the blockchain and links the previous block to it
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		if(this.checkBlock(newBlock)){
			throw new Error('Only one vote allowed per voter!')
		}
		newBlock.mineBlock(this.difficulty);
		if(newBlock.isValid){
			this.chain.push(newBlock);
		}
		else{
			console.log("Block not added. Retry!");

		}
	} 

	//checking if the blockchain has been tampered at any stage
	isChainValid(){
		for( let i=1; i<this.chain.length;i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(!currentBlock.isValid()){
				return false;
			}

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}
//making these classes available for use in other files
module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
