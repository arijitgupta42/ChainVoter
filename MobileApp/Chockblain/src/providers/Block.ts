import {Injectable} from "@angular/core";
import CryptoJS from 'crypto-js';
import "./elliptic-types";
import * as elliptic from "elliptic";
var EC = elliptic.ec;
var ec = new EC('secp256k1');


@Injectable()

//creating block for each vote counted with details of voter
export class Block {
  fromVoterID: string;
  fromName: string;
  fromAadhaar: string;
  toParty: string;
  constituency: string;
  timestamp: any;
  previousHash: string;
  publicKey: string;
  hash: string;
  nonce: number;
  signature: string;


  constructor(fromVoterID: string, fromName: string, fromAadhaar: string, toParty: string, constituency: string, timestamp: number, publicKey: string,  previousHash: string) {
    this.fromVoterID = fromVoterID;
    this.fromName = fromName;
    this.fromAadhaar = fromAadhaar;
    this.toParty = toParty;
    this.constituency = constituency;
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.publicKey = publicKey;
    this.hash = this.calculateHash();
    this.nonce = 0;

  }

  //calculating hash for each vote
  calculateHash() {
    return CryptoJS.SHA256(this.fromAadhaar + this.fromName + this.fromVoterID + this.toParty + this.timestamp + this.publicKey + this.previousHash + this.nonce).toString(CryptoJS.enc.Hex);
  }

  //calculating hash for signing purpose
  calculateHashSig() {
    return CryptoJS.SHA256(this.fromAadhaar + this.fromName + this.fromVoterID + this.publicKey).toString(CryptoJS.enc.Hex);
  }

  //mining the vote based on difficulty
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined :" + this.hash);
  }

  signVote(signingKey) {
    if (signingKey.getPublic('hex') !== this.publicKey) {
      throw new Error('You cannot vote from other devices! ');
    }
    const hashVt = this.calculateHashSig();
    const sig = signingKey.sign(hashVt, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {

    if (!this.publicKey || !this.fromAadhaar || !this.toParty) {   //required fields
      return false;
    }
    if (!this.signature || this.signature.length === 0) {		//must be signed
      throw new Error('No signature in this vote!');
    }
    const keyPub = ec.keyFromPublic(this.publicKey, 'hex');
    return keyPub.verify(this.calculateHashSig(), this.signature);    //!!!! returning false while it should be true

  }
}
