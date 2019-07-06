import { Injectable } from '@angular/core';
import { Blockchain } from 'ChainVoter/Chainvoter';
import EC from "elliptic";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public voterKeyspublic;
  private voterKeysprivate;
  public voterKeys;


  constructor() {
  	this.blockchainInstance.difficulty = 1;

  	this.generateVoterKeys();

   }

   getBlocks(){
   	return this.blockchainInstance.chain;
   }


   private generateVoterKeys(){
   	 const ec = new EC.ec("secp256k1");
   	 const key = ec.genKeyPair();
     this.voterKeyspublic = key.getPublic('hex');
     this.voterKeysprivate = key.getPublic('hex');
     this.voterKeys = key;



    /*this.voterKeys.push({
   	 keyObj: key,
   	 publicKey: key.getPublic('hex'),
   	 privateKey: key.getPrivate('hex'),
    })*/
  }
}



