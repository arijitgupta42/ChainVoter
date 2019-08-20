import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Blockchain} from "../../providers/BlockChain";
import {Block} from "../../providers/Block";

import "../../providers/elliptic-types.ts";
import * as elliptic from "elliptic";
import {AppUser} from "../../app/shared/sdk/models";
var EC = elliptic.ec;
var ec = new EC('secp256k1');

/**
 * Generated class for the VotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {

  voterForm: FormGroup;
  voterId:string;
  voteTo: string;
  constituency: string;
  voterKey: any;
  newVote= new Block(null, null, null, null, null, null, '', '');
  userInstance: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public blockChainInstance: Blockchain) {
    this.userInstance=navParams.get('user');


    this.voterForm = formBuilder.group({
      voterID: ['', Validators.required],
      voteTo: ['', Validators.required],
      constituency: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  submitVote(){
    console.log(this.newVote);
    this.voterKey=ec.genKeyPair(); //needs changes

    this.newVote = new Block(this.voterId, this.userInstance.name, this.userInstance.aadhar, this.voteTo, this.constituency, Date.now(), '','');
    this.newVote.publicKey = this.voterKey.getPublic('hex');
    this.newVote.signVote(this.voterKey);


    this.blockChainInstance.addBlock(this.newVote);

    this.newVote = new Block(null, null, null, null, null, null, '','');
  }

}
