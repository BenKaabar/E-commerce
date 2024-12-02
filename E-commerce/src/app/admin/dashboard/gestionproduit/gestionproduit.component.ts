import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/Produit';
import { ProduitService } from 'src/app/Services/Produit/produit.service';

@Component({
  selector: 'app-gestionproduit',
  templateUrl: './gestionproduit.component.html',
  styleUrls: ['./gestionproduit.component.css']
})
export class GestionproduitComponent implements OnInit {
  produits: Produit[] = [];
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.getproduits();
  }

  getproduits() {
    this.produits = this.produitService.getAllProduit();
  }
}
