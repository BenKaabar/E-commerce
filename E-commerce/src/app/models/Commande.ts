import { Client } from "./Client";
import { Panier } from "./Panier";

export class Commande {
    id!: number;
    dateCommande!: string | Date;;
    panier!: Panier;
    statut!: string;
    client!: Client;
}