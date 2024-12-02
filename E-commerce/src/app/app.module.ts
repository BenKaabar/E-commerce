import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { ProduitComponent } from './client/produit/produit.component';
import { PanierComponent } from './client/panier/panier.component';
import { CommandeComponent } from './client/commande/commande.component';
import { SigninComponent } from './client/signin/signin.component';
import { SignupComponent } from './client/signup/signup.component';
import { SigninadminComponent } from './admin/signinadmin/signinadmin.component';
import { SignupadminComponent } from './admin/signupadmin/signupadmin.component';
import { GestioncommandeComponent } from './admin/dashboard/gestioncommande/gestioncommande.component';
import { GestioncategorieComponent } from './admin/dashboard/gestioncategorie/gestioncategorie.component';
import { GestionproduitComponent } from './admin/dashboard/gestionproduit/gestionproduit.component';
import { DashboardComponent } from './admin/dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    ProduitComponent,
    PanierComponent,
    CommandeComponent,
    SigninComponent,
    SignupComponent,
    SigninadminComponent,
    SignupadminComponent,
    DashboardComponent,
    GestioncommandeComponent,
    GestioncategorieComponent,
    GestionproduitComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
