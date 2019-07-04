const SHA256 = require('crypto-js/sha256');


class Block{
	constructor(fromVoterID, fromName, fromAadhaar, toParty, consitutency, votes,previousHash=''){
		this.fromVoterID = fromVoterID;
		this.fromName = fromName;
		this.fromAadhaar = fromAadhaar;
		this.toParty = toParty;
		this.constituency = constituency;
		this.timestamp = Date.now();
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
    	
	}

	calculateHash(){
		return SHA256(this.fromAadhaar + this.fromName + this.fromVoterID + this.toParty + this.timestamp + this.previousHash + this.nonce).toString();
	}

	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mined :" + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
	}

	createGenesisBlock(){
		return new Block(null);
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	} 

	isChainValid(){
		for( let i=1; i<this.chain.length;i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

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


module.exports.Blockchain = Blockchain;
module.exports.Block = Block;

