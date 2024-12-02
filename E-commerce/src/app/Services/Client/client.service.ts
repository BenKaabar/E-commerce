import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients: Client[] = [
    { id: 1, username: 'soumaya', password: '111' },
    { id: 2, username: 'achraf', password: '111' }
  ];
  private nextId: number = this.clients.length + 1;

  constructor() { }
  signin(username: string, password: string): Observable<Client | null> {
    const client = this.clients.find(c => c.username === username && c.password === password);
    if (client) {
      this.setClient(client);
      console.log("Login successfully:", JSON.stringify(client));
      return of(client); // Retourne un Observable avec la valeur trouvée
    } else {
      console.log("Login failed");
      return of(null); // Retourne un Observable avec une valeur null
    }
  }

  setClient(client: Client): void {
    sessionStorage.setItem('client', JSON.stringify(client));
  }

  getClient(): Client | null {
    const clientData = sessionStorage.getItem('client');
    return clientData ? JSON.parse(clientData) : null;
  }

  signout(): void {
    sessionStorage.removeItem('client');
  }

  signup(username: string, password: string): Observable<Client | string> {
    const existingClient = this.clients.find(c => c.username === username);
    if (existingClient) {
      console.log("Signup failed: Username already exists");
      return of('Username already exists'); // Retourne un message d'erreur
    }

    const newClient: Client = {
      id: this.nextId++, // Génère un nouvel ID
      username,
      password
    };

    this.clients.push(newClient); // Ajoute le nouveau client à la liste
    this.setClient(newClient); // Enregistre le nouveau client dans sessionStorage
    console.log("Signup successfully:", JSON.stringify(newClient));
    return of(newClient); // Retourne le nouveau client enregistré
  }

}