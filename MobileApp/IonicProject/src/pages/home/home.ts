import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Blockchain} from "../../providers/BlockChain";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public blockChainInstance: Blockchain) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  loginPage(){
    this.navCtrl.push('LoginPage',{request: 'login', bcinstance: this.blockChainInstance})
  }

  signUpPage(){
    this.navCtrl.push('LoginPage',{request: 'register', bcinstance: this.blockChainInstance})
  }
}
