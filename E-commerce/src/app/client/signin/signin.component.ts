import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username = '';
  password = '';
  currentclient: Client | null = null;

  constructor(private router: Router, private clientservice: ClientService) { }

  signin(): void {
    this.clientservice.signin(this.username, this.password).subscribe({
      next: (client) => {
        if (client) {
          this.currentclient = client;
          this.router.navigate(['/Accueil']);
        }
      },
      error: (err) => {
        console.error("Erreur lors de la connexion:", err);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    });
  }

  onLogout(): void {
    this.clientservice.signout();
    this.currentclient = null; // Réinitialiser le client actuel
    alert('Vous êtes déconnecté.');
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  getCurrentClient(): Client | null {
    return this.clientservice.getClient();
  }
}