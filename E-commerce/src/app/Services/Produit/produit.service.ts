import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produit } from 'src/app/models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor() { }
  private produits: Produit[] = [
    { id: 1, nom: 'manga', prix: 10, description: 'fruit', quantite: 1, imageUrl: "/assets/images/produits/manga.png", categorie: "fruit" },
    { id: 2, nom: 'banane', prix: 5, description: 'fruit', quantite: 1, imageUrl: "/assets/images/produits/banane.png", categorie: "fruit" },
    { id: 3, nom: 'tomate', prix: 3, description: 'légume', quantite: 1, imageUrl: "/assets/images/produits/tomate.png", categorie: "legume" },
    { id: 4, nom: 'laitue', prix: 2, description: 'légume', quantite: 1, imageUrl: "/assets/images/produits/laitue.png", categorie: "legume" }
  ]

  getAllProduit() {
    return this.produits;
  }
  
  searchProducts(searchTerm: string): Observable<Produit[]> {
    if (!searchTerm) {
      return of(this.produits); // Return all products if no search term
    }

    // Filter products by name or category (case insensitive)
    const filteredProducts = this.produits.filter(product =>
      product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categorie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filteredProducts); // Return filtered products as observable
  }
}
