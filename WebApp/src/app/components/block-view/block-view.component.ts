import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service'

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {
  
  
  @Input() public block;


  constructor(private blockchainService: BlockchainService) { 
  

  }

  ngOnInit() {
  		
  }

  public showDetails(){
  	
  	 if(this.blockchainService.username == "admin" && this.blockchainService.password == "admin"){

  	alert("Name: " + this.block.fromName + '\n' + 'Constituency: ' + this.block.constituency 
  	+ '\n' + "Aadhaar Number: " + this.block.fromAadhaar + '\n' + "Voter ID: " 
  	+ this.block.fromVoterID + '\n' + "Party :" + this.block.toParty);
    } else {
    	alert("You are not an admin and hence cannot view this data!");
    }
  }
}
