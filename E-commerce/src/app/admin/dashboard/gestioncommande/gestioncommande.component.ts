import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande';
import { CommandeService } from 'src/app/Services/Commande/commande.service';

@Component({
  selector: 'app-gestioncommande',
  templateUrl: './gestioncommande.component.html',
  styleUrls: ['./gestioncommande.component.css']
})
export class GestioncommandeComponent implements OnInit {
  commandes: Commande[] = [];
  constructor(private commandeservice: CommandeService) { }

  ngOnInit(): void {
    this.getcommandes();
  }

  getcommandes() {
    this.commandes = this.commandeservice.obtenirCommandes();
  }
}