import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';

  constructor(private router: Router, private clientservice: ClientService) { }

  signup(): void {
    this.clientservice.signup(this.username, this.password).subscribe(response => {
      if (typeof response === 'string') {
        console.error('Erreur:', response); // Affiche le message d'erreur si le nom d'utilisateur existe
      } else {
        const client = this.clientservice.getClient();
        this.router.navigate(["/signin"]);
        console.log('Client enregistré dans sessionStorage:', client);
      }
    });

  }

}