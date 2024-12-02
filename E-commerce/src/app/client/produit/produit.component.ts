import { CommandeService } from 'src/app/Services/Commande/commande.service';
import { Commande } from 'src/app/models/Commande';
import { Produit } from 'src/app/models/Produit';
import { ProduitService } from './../../Services/Produit/produit.service';
import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/Services/Panier/panier.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  nombredeproduits: number = 0;
  nombredecommandes: number = 0;
  searchTerm: string = '';
  constructor(private produitService: ProduitService, private panierservice: PanierService, private CommandeService: CommandeService) { }

  ngOnInit(): void {
    // Récupérer les produits et initialiser la quantité à 1
    this.produits = this.produitService.getAllProduit().map(produit => ({
      ...produit,
      quantite: 1 // Ajouter la propriété `quantite` à chaque produit
    }));
    // this.nombredeproduits = this.panierservice.nombreTotalProduits();
    this.nombredecommandes = this.CommandeService.nombreTotalCommandes();
    this.loadProduits();
  }

  addpanier(item: Produit): void {
    this.panierservice.ajouterAuPanier(item, item.quantite);
    console.log(`Produit ajouté au panier : ${item.nom}, Quantité : ${item.quantite}, Prix : ${item.prix}`);
    this.nombredeproduits = this.panierservice.nombreTotalProduits();
  }

  increment(item: Produit): void {
    item.quantite++;
  }

  decrement(item: Produit): void {
    if (item.quantite > 1) {
      item.quantite--;
    }
  }
  // Load all products on initial load
  loadProduits(): void {
    this.produitService.searchProducts(this.searchTerm).subscribe((data) => {
      this.produits = data;
    });
  }

  // Update products list based on search input
  onSearchChange(): void {
    this.produitService.searchProducts(this.searchTerm).subscribe((data) => {
      this.produits = data;
    });
  }
}
