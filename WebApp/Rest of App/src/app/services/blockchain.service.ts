import { Injectable } from '@angular/core';
import { Blockchain } from 'ChainVoter/Chainvoter';
import EC from "elliptic";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  username: string;
  password: string;

  public blockchainInstance = new Blockchain();
  public difficulty = this.blockchainInstance.difficulty;
  


  constructor() {

  	this.blockchainInstance.difficulty = 1;
    this.username = prompt("Please enter your username");
    if(this.username == null || this.username == ""){
     alert("You must enter a username");
     } else{
     this.password = prompt("Please enter your password");
     }
     if(this.username !== 'admin' || this.password !== "admin"){
       alert("As you are not an admin you will not be able to access details");
     }

  	
   }

   getBlocks(){
   	return this.blockchainInstance.chain;
   }


  


    /*this.voterKeys.push({
   	 keyObj: key,
   	 publicKey: key.getPublic('hex'),
   	 privateKey: key.getPrivate('hex'),
    })*/
  }



