import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/Services/Panier/panier.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  search() { }

  nombredeproduits: number = 0;
  constructor(private panierservice: PanierService) { }
  ngOnInit(): void {
    this.nombredeproduits = this.panierservice.nombreTotalProduits();
  }

}
