import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './client/authentification/authentification.component';
import { AccueilComponent } from './client/accueil/accueil.component';

const routes: Routes = [
  { path: "", component: AuthentificationComponent },
  { path: "accueil", component: AccueilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
