import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';
import {Block} from "../providers/Block";
import {Blockchain} from "../providers/BlockChain";
import { FaceApiProvider } from '../providers/face-api/face-api';
import {SDKNodeModule} from "./shared/sdk";
import { IonicStorageModule } from "@ionic/storage";
import {AppUserApi} from "./shared/sdk";
import {Camera} from "@ionic-native/camera";


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKNodeModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Block, Blockchain,
    AppUserApi,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FaceApiProvider
  ]
})
export class AppModule {}
