import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppUserApi} from "../../app/shared/sdk/services/custom/AppUser";
import {AppUser} from "../../app/shared/sdk/models/AppUser";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Camera, CameraOptions} from "@ionic-native/camera";

import "../../providers/elliptic-types.ts";
import * as elliptic from "elliptic";
import {Blockchain} from "../../providers/BlockChain";
var EC = elliptic.ec;
var ec = new EC('secp256k1');


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  request: string;
  registerForm: FormGroup;
  loginForm: FormGroup;
  userInstance: AppUser;
  subscriptionKey = "ddd074bf98df46e281f608a6c27405e2";
  uriBase = "https://centralindia.api.cognitive.microsoft.com/face/v1.0/";
  verify = false;
  bcInstance: Blockchain;

  options : CameraOptions = {
    quality:100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection:this.camera.Direction.FRONT,
  };

  regFace:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public appUserApi: AppUserApi, public alertCtrl: AlertController, public toastCtrl: ToastController, public httpClient: HttpClient, public ldngCtrl: LoadingController, private camera: Camera) {
    this.userInstance = new AppUser();

    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      aadhar: ['', Validators.compose([
        Validators.pattern('^[0-9]{12}$'),
        Validators.required
      ])],
      email: ['', Validators.email],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
    });

    this.loginForm = formBuilder.group({
      aadhar: ['', Validators.compose([
        Validators.pattern('^[0-9]{12}$'),
        Validators.required
      ])],
      email: ['', Validators.email],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.request = this.navParams.get('request');
    this.bcInstance=this.navParams.get('bcinstance');

  }

  login() {
    this.userInstance = new AppUser();
    this.request = 'login';
  }

  register() {
    this.userInstance = new AppUser();
    this.request = 'register';
  }

  registerAppUser() {
    console.log("Registering user: ", this.userInstance);
    let voterKey= ec.genKeyPair();
    this.userInstance.publicKey=voterKey.getPublic('hex');
    this.userInstance.privateKey=voterKey.getPrivate('hex');

    let loading=this.ldngCtrl.create({
      content: "Please wait, registering user"
    });
    loading.present();
    //register in db
    this.appUserApi.create<AppUser>(this.userInstance).toPromise()
      .then(data => {
        console.log(data);
        loading.dismiss();
        this.userInstance = new AppUser();
        let alert = this.alertCtrl.create({
          title: "Success",
          subTitle: 'You have successfully registered, please login using these new credentials',
          buttons: ['OK']
        });
        alert.present();
        this.login();
        this.regFace=false;
      }, err => {
        console.log(err);
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Error: ' + err,
          duration: 5000
        });
        toast.present();
      });
  }

  loginAppUser() {
    console.log("Logging in user: ", this.userInstance);
    let filter = {"where": {"email": this.userInstance.email, "password": this.userInstance.password, "aadhar" : this.userInstance.aadhar}};
    this.appUserApi.findOne(filter).toPromise()
      .then(data => {
        console.log(data);
        this.userInstance.faceID=data['faceID'];
        this.userInstance.name=data['name'];
        this.userInstance.id=data['id'];
        this.userInstance.publicKey=data['publicKey'];
        this.userInstance.privateKey=data['privateKey'];
        this.userInstance.username=data['username']; //not used

        this.verifyFaceProcess();
      }, err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: 'Error: Could not find user. Please register.',
          duration: 5000
        });
        toast.present();

      })
  }

  verifyFaceProcess(){
    this.verify=true;
    this.takeImage();
  }

  getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }

  b64toBlob = (b64Data, contentType='image/jpeg', sliceSize=512) => {
    const byteCharacters = atob(b64Data.replace(/^data:image\/jpeg;base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  };

  takeImage(){
    this.camera.getPicture(this.options).then(
      (imageData)=>{
        let b64data='data:image/jpeg;base64,' + imageData;
        let blob: Blob = this.b64toBlob(b64data, this.getContentType(b64data));
        // this.httpClient.request("GET", "../assets/face_data_temp/user_ameya.jpg", {responseType:"blob"}).subscribe( data=> {
        //   this.detectFace(data);
        // });
        this.detectFace(blob);
      }, err=>{
        console.log(err);
      }
    );
  }


  detectFace(blob: Blob) {
    console.log(blob);
    let loading=this.ldngCtrl.create({
      content: "Please wait, detecting Face"
    });
    loading.present();
    const myheader = new HttpHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Ocp-Apim-Subscription-Key', this.subscriptionKey);

    let params = {
      "returnFaceId": "true",
    };

    this.httpClient.request('POST', this.uriBase + 'detect', {body: blob, headers: myheader, params: params}).subscribe(
      data => {
        let faceId: string;
        if(data[0]){
          console.log(data[0].faceId);
          faceId=data[0].faceId;
          this.regFace=true;
        }else {
          console.log('Error: Failed to detect face, please try again');
        }
        loading.dismiss();
        if (this.verify==true){
          this.verifyFace(faceId);
        } else{
          this.userInstance.faceID=faceId;
        }
      }, err => {
        console.log(err);
        loading.dismiss();
      }
    )

  }

  verifyFace(faceID: string){
    console.log('verifying http');
    let loading=this.ldngCtrl.create({
      content: "Please wait, verifying Face"
    });
    loading.present();
    const myheader = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Ocp-Apim-Subscription-Key', this.subscriptionKey);

    let body={
      faceId1: faceID,
      faceId2: this.userInstance.faceID
    };

    this.httpClient.request('POST', this.uriBase + 'verify', {body: body, headers: myheader}).subscribe(
      data => {
        console.log(data);
        loading.dismiss();
        this.verify=false;
        if (data['isIdentical']==true){
          this.navCtrl.push('VotePage', {user: this.userInstance, bcInstance: this.bcInstance});
        } else {
          let toast = this.toastCtrl.create({
            message: 'Error: Could not verify face',
            duration: 5000
          });
          toast.present();
        }
      }, err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }
}
