import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service'
import { Block } from 'ChainVoter/ChainVoter'


@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit {

  public newVt;
  public voterKey;

  constructor(private blockchainService: BlockchainService) {
  	this.voterKey = blockchainService.voterKeys;

   }

  ngOnInit() {
  	this.newVt = new Block();
  	console.log(this.newVt);
  }


  createVoter(){
    console.log(this.newVt);	
  	this.newVt.publicKey = this.voterKey.keyObj.getPublic('hex');
  	this.newVt.signVote(this.voterKey.keyObj);


    this.blockchainService.blockchainInstance.addBlock(this.newVt); 
    
    this.newVt = new Block(); 	

  }

}
