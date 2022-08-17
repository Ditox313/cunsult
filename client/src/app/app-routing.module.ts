import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/guards/auth.guard';




const routes: Routes = [
  // {
  // path: 'favourites',
  //   component: FavouritesComponent,
  // },
  // {
  //   path: 'tape',
  //   component: TapeComponent,
  // },
  // {
  //   path: 'messages',
  //   component: MessagesComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
