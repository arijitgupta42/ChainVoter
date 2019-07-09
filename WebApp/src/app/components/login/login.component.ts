import { Component, OnInit,Injectable } from '@angular/core';

import { BlockchainService } from 'src/app/services/blockchain.service'
import { Block } from 'ChainVoter/ChainVoter'
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
import {MatDividerModule} from '@angular/material/divider'
import EC from "elliptic";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  constructor(private router: Router, public blockchainService: BlockchainService) { 
    if(this.voterKeys == null) this.generateVoterKeys();
  }

  public voterKeyspublic = null;
  private voterKeysprivate = null;
  public voterKeys = null;    


  username: string;
  password: string;

   public generateVoterKeys(){
   	 const ec = new EC.ec("secp256k1");
   	 const key = ec.genKeyPair();
     this.voterKeyspublic = key.getPublic('hex');
     this.voterKeysprivate = key.getPrivate('hex');
     this.voterKeys = key;
     console.log("Your generated username: "+ this.voterKeyspublic + "\n" + "Your generated password: "+ this.voterKeysprivate)
     

  }



  ngOnInit() {
  }

  login() : void {
    
    const ec = new EC.ec("secp256k1");
  	if((this.username == 'admin' && this.password == 'admin')){
      this.router.navigate(["vote"]);
  	}else {
      
      alert("Invalid credentials");
  	}
  }

}
