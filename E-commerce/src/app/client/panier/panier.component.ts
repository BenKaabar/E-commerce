import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PanierItem } from 'src/app/models/PanierItem';
import { CommandeService } from 'src/app/Services/Commande/commande.service';
import { PanierService } from 'src/app/Services/Panier/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  nombredeproduits: number = 0; // Nombre de produits (distincts)
  nombredecommandes: number = 0;
  items: PanierItem[] = []; // Liste des produits dans le panier
  prixTotal: number = 0;    // Prix total
  confirmationMessage: string = '';
  constructor(private panierservice: PanierService, private commandeService: CommandeService, private router: Router, private CommandeService: CommandeService) { }

  ngOnInit(): void {
    this.updatePanier();
    this.nombredecommandes = this.CommandeService.nombreTotalCommandes();
  }

  updatePanier(): void {
    const panier = this.panierservice.obtenirPanier();
    this.items = panier.items;
    this.nombredeproduits = this.items.length;
    this.calculerPrixTotal();
  }

  calculerPrixTotal(): void {
    this.prixTotal = this.items.reduce((total, item) => total + (item.produit.prix * item.quantite), 0);
  }

  supprimerProduit(produitId: number): void {
    this.panierservice.supprimerDuPanier(produitId);
    this.updatePanier();
  }

  increment(item: PanierItem): void {
    item.quantite++;
    this.calculerPrixTotal(); // Met à jour le prix total
  }

  decrement(item: PanierItem): void {
    if (item.quantite > 1) {
      item.quantite--;
      this.calculerPrixTotal(); // Met à jour le prix total
    }
  }

  passerCommande(): void {
    const panier = this.panierservice.obtenirPanier();
    if (this.nombredeproduits > 0) {
      this.commandeService.passerCommande(panier);
      this.confirmationMessage = 'Commande passée avec succès !';
      this.panierservice.viderPanier();
      this.updatePanier();
      this.router.navigate(['/Commande']);
      // setTimeout(() => {
      //   this.confirmationMessage = ''; // Efface le message après 2 secondes
      // }, 2000);
    } else {
      this.confirmationMessage = 'Votre panier est vide.';
    }
  }
}
