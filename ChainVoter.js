const SHA256 = require('crypto-js/sha256');


class Block{
	constructor(name,votedTo,constituency,aadhaar,voterId,previousHash=''){
		this.timestamp = Date.now();
		this.name = name;
		this.votedTo = votedTo;
		this.constituency = constituency;
		this.aadhaar = aadhaar;
		this.voterId = voterId;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
    	
	}

	calculateHash(){
		return SHA256(this.votedto + this.timestamp + this.previousHash + this.constituency + this.name + this.aadhaar + this.voterid + this.nonce).toString();
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

let Chockblain = new Blockchain();

console.log("Mining block 1......");
Chockblain.addBlock(new Block());

console.log("Mining block 2......");
Chockblain.addBlock(new Block());

console.log("Mining block 3......");
Chockblain.addBlock(new Block());

console.log(Chockblain);

