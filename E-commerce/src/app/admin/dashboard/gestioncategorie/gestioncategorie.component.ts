import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande';
import { CommandeService } from 'src/app/Services/Commande/commande.service';

@Component({
  selector: 'app-gestioncategorie',
  templateUrl: './gestioncategorie.component.html',
  styleUrls: ['./gestioncategorie.component.css']
})
export class GestioncategorieComponent implements OnInit {
  commandes: Commande[] = [];
  constructor(private commandeservice: CommandeService) { }

  ngOnInit(): void {
    this.getcommandes();
  }

  getcommandes() {
    this.commandes = this.commandeservice.obtenirCommandes();
  }
}