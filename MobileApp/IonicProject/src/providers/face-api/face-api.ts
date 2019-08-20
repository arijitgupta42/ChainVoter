import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

/*
  Generated class for the FaceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FaceApiProvider {

  subscriptionKey = "7d206c3dba2e47c88c0720eccda5cd00";
  uriBase = "https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect";

  constructor(public http: HttpClient) {
    console.log('Hello FaceApiProvider Provider');
  }

  /**
   * Need to send a HTTP Request to the Face API.
   * Three requirements:
   * 1: Base url must be westus for trial account
   * 2: Subscription key must be in as a header
   * 3: Data must be JSON encoded
   *
   * 1 Required Param which is the image URL
   * 2 Optional Parameters setup
   */
  sendRequest(sourceImageUrl:string){

    //Promises allow us to elegantly handle some API call.
    return new Promise((resolve, reject)=>{
      //Set the headers with the subscription key
      const myheader = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Ocp-Apim-Subscription-Key', this.subscriptionKey);

      // Request parameters.
      var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
      };
      //Prepare the body with a json object containing the image URL to be analyzed
      let body = JSON.stringify({ url: sourceImageUrl});


      //Options object used to pass our headers and params.
      const httpOptions = {
        headers: myheader,
        params: params,

      };
      //Fire request at the url with params+abody
      this.http
        .post(this.uriBase, body, httpOptions)
        .subscribe((result) =>{
          //Do something with result
          resolve(result);
        });

    });//end promise
  }

  checkFaceAPI(faceUrlToCheck?:string):Promise<any>{
    console.log("Making request to face API with URL" + faceUrlToCheck);
    return new Promise((resolve, reject) => {
      this.sendRequest(faceUrlToCheck)
        .then((result => {

          let emotionsObject = result[0]['faceAttributes']['emotion'];
          var correctEmotion=Object.keys(emotionsObject)
            .reduce(function(a, b){
              return emotionsObject[a] > emotionsObject[b] ? a : b
            });

          var hasGlasses = result[0]['faceAttributes']['glasses'];
          var gender = result[0]['faceAttributes']['gender'];
          var age = result[0]['faceAttributes']['age'];
          console.log(result);
          console.log("Correct Emotion"+ result[0]['faceAttributes']['emotion']['happiness']);
          console.log("Correct Emotion"+ result[0]['faceAttributes']['emotion']);

          console.log("Correct Emotion"+correctEmotion);


          resolve({
            correctEmotion : correctEmotion,
            hasGlasses : hasGlasses,
            gender : gender,
            age: age,
            emotionsObject : emotionsObject
          })


        }));
    })
  }

  // changeImagetoStream(url:string){
  //
  // }

  verifyFace(data: any){
    const myheader = new HttpHeaders()
      .set('Content-Type', 'application/octet-stream')
      .set('Ocp-Apim-Subscription-Key', this.subscriptionKey);

    let params = {
      "returnFaceId": "true",
    };

    return this.http.request('POST', this.uriBase, {body:data, headers:myheader, params: params}).subscribe(
      data=>{
        console.log(data);
        return data;
      }, err=>{
        console.log(err);
        return err;
      }
    )


  }

}
