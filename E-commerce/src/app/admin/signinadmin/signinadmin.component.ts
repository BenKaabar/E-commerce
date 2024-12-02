import { AdminService } from './../../Services/Admin/admin.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';

@Component({
  selector: 'app-signinadmin',
  templateUrl: './signinadmin.component.html',
  styleUrls: ['./signinadmin.component.css']
})
export class SigninadminComponent {
  username = '';
  password = '';
  currentadmin: Admin | null = null;
  constructor(private router: Router, private adminService: AdminService) {

  }
  signin() {
    this.adminService.signin(this.username, this.password).subscribe({
      next: (admin) => {
        if (admin) {
          this.currentadmin = admin;
          this.router.navigate(["/admin"]);
        }
      },
      error: (err) => {
        console.error("Erreur lors de la connexion:", err);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    })
  }
  getcurrentadmin(): Admin | null {
    return this.getcurrentadmin();
  }
}
