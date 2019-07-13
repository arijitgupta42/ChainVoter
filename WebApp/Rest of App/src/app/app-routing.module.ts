import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CastVoteComponent } from './pages/cast-vote/cast-vote.component'
import {LoginComponent} from './components/login/login.component';



const routes: Routes = [
 {path: 'settings',component: SettingsComponent},
 {path: 'vote', component: CastVoteComponent}, 
 {path: 'blockchain', component : BlockchainViewerComponent },
 {path : '', component: BlockchainViewerComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
