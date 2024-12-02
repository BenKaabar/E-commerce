import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './client/accueil/accueil.component';
import { PanierComponent } from './client/panier/panier.component';
import { CommandeComponent } from './client/commande/commande.component';
import { SigninComponent } from './client/signin/signin.component';
import { SignupComponent } from './client/signup/signup.component';
import { SigninadminComponent } from './admin/signinadmin/signinadmin.component';
import { SignupadminComponent } from './admin/signupadmin/signupadmin.component';
import { GestioncategorieComponent } from './admin/dashboard/gestioncategorie/gestioncategorie.component';
import { GestioncommandeComponent } from './admin/dashboard/gestioncommande/gestioncommande.component';
import { GestionproduitComponent } from './admin/dashboard/gestionproduit/gestionproduit.component';
import { DashboardComponent } from './admin/dashboard/dashboard/dashboard.component';
const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "Accueil", component: AccueilComponent },
  { path: "Panier", component: PanierComponent },
  { path: "Commande", component: CommandeComponent },
  { path: "signinadmin", component: SigninadminComponent },
  { path: "signupadmin", component: SignupadminComponent },
  {
    path: 'admin', component: DashboardComponent, children: [
      { path: 'gestion-categorie', component: GestioncategorieComponent },
      { path: 'gestion-commande', component: GestioncommandeComponent },
      { path: 'gestion-produit', component: GestionproduitComponent },
      { path: '', redirectTo: 'gestion-produit', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
