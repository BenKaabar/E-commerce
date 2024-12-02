import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande';
import { Panier } from 'src/app/models/Panier';
import { ClientService } from 'src/app/Services/Client/client.service';
import { CommandeService } from 'src/app/Services/Commande/commande.service';
import { PanierService } from 'src/app/Services/Panier/panier.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-commandes',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  items: any[] = []; // Store items in the cart
  nombredeproduits: number = 0; // Number of products in cart
  prixTotal: number = 0;
  commandes: Commande[] = []; // Store all commandes
  selectedCommande!: Commande;

  constructor(
    private commandeService: CommandeService,
    private clientService: ClientService,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe((commandes: any[]) => {
      this.commandes = commandes.map(commande => ({
        ...commande,
        dateCommande: new Date(commande.dateCommande) // Conversion explicite
      }));
      console.log('Commandes chargées :', this.commandes);
    });
  }


  afficherCommandes(): void {
    console.log(this.commandeService.obtenirCommandes());
  }
  passerCommande(): void {
    const client = this.clientService.getClient(); // Get the current client from session
    const panier = this.panierService.obtenirPanier(); // Get the current panier from session

    if (client && panier && this.nombredeproduits > 0) {
      // Call the service to add the commande
      this.commandeService.addCommande().subscribe((commande: Commande) => {
        if (commande.id) {
          this.commandes.push(commande);
          this.resetCart(); // Reset the cart after order is placed
        } else {
          console.log('Erreur lors de la création de la commande.');
        }
      });
    }
  }
  resetCart(): void {
    this.items = [];
    this.nombredeproduits = 0;
    this.prixTotal = 0;
  }

  openConsultModal(commande: Commande): void {
    this.selectedCommande = commande;
    const consultModalElement = document.getElementById('consultercommande');
    if (consultModalElement) {
      const consultModal = new bootstrap.Modal(consultModalElement);
      consultModal.show();
    }
  }
  calculateTotal(panier: Panier): number {
    return panier.items.reduce(
      (total, item) => total + item.produit.prix * item.quantite,
      0
    );
  }

}
