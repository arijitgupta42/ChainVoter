import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { CastVoteComponent } from './pages/cast-vote/cast-vote.component'



const routes: Routes = [
 {path: '',component: BlockchainViewerComponent },
 {path: 'settings',component: SettingsComponent},
 {path: 'vote', component: CastVoteComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
