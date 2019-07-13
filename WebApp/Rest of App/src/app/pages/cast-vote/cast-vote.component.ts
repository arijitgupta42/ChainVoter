import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service'
import { Block } from 'ChainVoter/ChainVoter'
import { LoginComponent } from 'src/app/components/login/login.component'


@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit {

  public newVt;
  public voterKeyPublic;
  public voterKey;

  constructor(private loginComponent: LoginComponent) {
  	this.voterKeyPublic = loginComponent.voterKeyspublic;
    this.voterKey = loginComponent.voterKeys;
    console.log(this.voterKey);

   }

  ngOnInit() {
  	this.newVt = new Block();
  	console.log(this.newVt);
  }


  createVoter(){
    console.log(this.newVt);	
  	this.newVt.publicKey = this.voterKeyPublic;
  	this.newVt.signVote(this.voterKey);


    this.loginComponent.blockchainService.blockchainInstance.addBlock(this.newVt); 

    console.log(this.loginComponent.blockchainService.blockchainInstance.isChainValid());
    
    this.newVt = new Block(); 	

  }

}
