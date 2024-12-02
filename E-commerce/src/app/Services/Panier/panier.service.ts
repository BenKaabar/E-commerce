import { Injectable, OnInit } from '@angular/core';
import { Panier } from 'src/app/models/Panier';
import { Produit } from 'src/app/models/Produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService{
  private items: Produit[] = [];
  private panier: Panier = new Panier();
  constructor() { }

  ajouterAuPanier(produit: Produit, quantite: number): void {
    const item = this.panier.items.find(i => i.produit.id === produit.id);
    if (item) {
      item.quantite += quantite; // Si le produit existe, augmenter la quantité
    } else {
      this.panier.items.push({ produit, quantite }); // Sinon, l'ajouter
    }
    console.log('Produit ajouté ou mis à jour dans le panier:', this.panier.items);
  }

  // Changer la quantité d'un produit
  changerQuantite(produitId: number, quantite: number): void {
    const item = this.panier.items.find(i => i.produit.id === produitId);
    if (item) {
      item.quantite = quantite;
      console.log(`Quantité mise à jour pour le produit ${produitId}: ${quantite}`);
    } else {
      console.warn(`Produit avec ID ${produitId} introuvable dans le panier.`);
    }
  }

  // Retourner le contenu du panier
  obtenirPanier(): Panier {
    return this.panier;
  }

  // Vider le panier
  viderPanier(): void {
    this.panier.items = [];
    console.log('Le panier a été vidé.');
  }

  nombreTotalProduits(): number {
    return this.panier.items.length;
  }

  increment(produitId: number): void {
    const item = this.panier.items.find(item => item.produit.id === produitId);
    if (item) {
      item.quantite++;
      this.sauvegarderPanier();
    }
  }

  decrement(produitId: number): void {
    const item = this.panier.items.find(item => item.produit.id === produitId);
    if (item && item.quantite > 1) {
      item.quantite--;
      this.sauvegarderPanier();
    }
  }

  supprimerDuPanier(produitId: number): void {
    this.panier.items = this.panier.items.filter(item => item.produit.id !== produitId);
    this.sauvegarderPanier();
  }

  sauvegarderPanier(): void {
    localStorage.setItem('panier', JSON.stringify(this.panier));
  }

}
