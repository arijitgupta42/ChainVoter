import {Injectable} from "@angular/core";
import {Block} from "./Block";

@Injectable()
export class Blockchain{
  chain: Array<Block>;
  difficulty: number;
  //default constructor that initiates genesis block creation function
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
  }

  //function that creates genesis block
  createGenesisBlock(){
    console.log('Genesis created');
    return new Block('Genesis Block', null,null,null,null, null, '', '');
  }

  //returns the last vote added to the blockchain
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  //check if same signature exists in another block in the chain
  checkBlock(newBlock: Block){
    for( let i=1; i<this.chain.length;i++){
      const currentBlock = this.chain[i];
      if(currentBlock.signature === newBlock.signature){
        return true;
      }
    }
    return false;
  }

  //adds a new vote to the blockchain and links the previous block to it
  addBlock(newBlock: Block){
    console.log('Adding new Block', newBlock);
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
