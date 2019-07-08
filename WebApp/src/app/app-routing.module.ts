import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CastVoteComponent } from './pages/cast-vote/cast-vote.component'
import {LoginComponent} from './components/login/login.component';



const routes: Routes = [
 {path: 'settings',component: SettingsComponent},
 {path: 'vote', component: CastVoteComponent}, 
 {path: 'login', component: LoginComponent },
 {path: 'blockchain', component : BlockchainViewerComponent },
 {path : '', component : LoginComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
