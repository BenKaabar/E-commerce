import { Injectable } from '@angular/core';
import { Commande } from 'src/app/models/Commande';
import { Panier } from 'src/app/models/Panier';
import { ClientService } from '../Client/client.service';
import { Observable, of } from 'rxjs';
import { PanierService } from '../Panier/panier.service';
import { Status } from 'src/app/Services/Enum/status';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private commandes: Commande[] = []; // Liste des commandes
  private panier: Panier | null = null; // Panier temporaire

  constructor(private clientService: ClientService, private panierservice: PanierService) {
    // Initialisation avec des exemples de commandes
    this.commandes = [
      {
        id: 1,
        dateCommande: new Date('2024-11-25'),
        panier: {
          id: 1,
          items: [
            {
              produit: {
                id: 1,
                nom: "manga",
                prix: 10,
                description: "fruit",
                quantite: 5,
                imageUrl: "/assets/images/produits/manga.png",
                categorie: "fruit"
              },
              quantite: 2
            },
            {
              produit: {
                id: 2,
                nom: "banane",
                prix: 5,
                description: "fruit",
                quantite: 2,
                imageUrl: "/assets/images/produits/banane.png",
                categorie: "fruit"
              },
              quantite: 1
            }, {
              produit: {
                id: 4,
                nom: "laitue",
                prix: 2,
                description: "légume",
                quantite: 10,
                imageUrl: "/assets/images/produits/laitue.png",
                categorie: "légume"
              },
              quantite: 2
            }
          ]
        },
        statut: Status.Pending,
        client: this.clientService.getClient()! // Assigning the current logged-in client
      },
      {
        id: 2,
        dateCommande: new Date('2024-11-25'),
        panier: {
          id: 2,
          items: [
            {
              produit: {
                id: 203,
                nom: "tomate",
                prix: 3,
                description: "légume",
                quantite: 10,
                imageUrl: "/assets/images/produits/tomate.png",
                categorie: "légume"
              },
              quantite: 3
            },
            {
              produit: {
                id: 2,
                nom: "banane",
                prix: 5,
                description: "fruit",
                quantite: 10,
                imageUrl: "/assets/images/produits/banane.png",
                categorie: "fruit"
              },
              quantite: 1
            }
          ]
        },
        statut: Status.Pending,
        client: this.clientService.getClient()! // Assigning the current logged-in client
      },
      {
        id: 3,
        dateCommande: new Date('2024-11-26'),
        panier: {
          id: 3,
          items: [
            {
              produit: {
                id: 203,
                nom: "tomate",
                prix: 3,
                description: "légume",
                quantite: 10,
                imageUrl: "/assets/images/produits/tomate.png",
                categorie: "légume"
              },
              quantite: 3
            },
            {
              produit: {
                id: 4,
                nom: "laitue",
                prix: 2,
                description: "légume",
                quantite: 10,
                imageUrl: "/assets/images/produits/laitue.png",
                categorie: "légume"
              },
              quantite: 2
            }
          ]
        },
        statut: Status.Pending,
        client: this.clientService.getClient()! // Assigning the current logged-in client
      }
    ];
  }

  passerCommande(panier: Panier): void {
    const client = this.clientService.getClient(); // Get the current client
    if (!client) {
      console.error("No client logged in!");
      return;
    }
    let lastPanierId = Number(localStorage.getItem('lastPanierId')) || 0;
    const panierAvecId: Panier = {
      ...panier,
      id: ++lastPanierId // Attribuer un nouvel ID unique au panier
    };
    // panier.id= this.panier.
    const nouvelleCommande: Commande = {
      id: this.commandes.length + 1, // Génère un nouvel ID
      dateCommande: new Date(),
      panier: panierAvecId, // Copie du panier
      statut: Status.Pending,
      client: client // Assign the logged-in client to the new command
    };

    this.commandes.push(nouvelleCommande); // Ajoute la commande à la liste
    localStorage.setItem('commandes', JSON.stringify(this.commandes)); // Sauvegarde dans localStorage
    console.log('Commande passée avec succès !', nouvelleCommande);
  }

  obtenirCommandes(): Commande[] {
    return this.commandes;
  }

  obtenirCommandeParId(id: number): Commande | null {
    return this.commandes.find(commande => commande.id === id) || null;
  }

  obtenirPanierActif(): Panier | null {
    return this.panier;
  }
  addCommande(): Observable<Commande> {
    const client = this.clientService.getClient();
    const panier = this.panierservice.obtenirPanier();

    if (client && panier) {
      const newCommande: Commande = {
        id: this.commandes.length + 1, // Incremental ID, adjust as needed
        dateCommande: new Date(),
        panier: panier, // Link to the current panier
        statut: 'En cours', // Initial status
        client: client // Link to the current client
      };

      this.commandes.push(newCommande); // Add the new commande to the list
      return of(newCommande); // Return the new commande
    } else {
      return of({} as Commande); // Return an empty object if client or panier is missing
    }
  }

  // Method to get all commandes
  getCommandes(): Observable<Commande[]> {
    return of(this.commandes);
  }

  nombreTotalCommandes(): number {
    return this.commandes.length;
  }
}
