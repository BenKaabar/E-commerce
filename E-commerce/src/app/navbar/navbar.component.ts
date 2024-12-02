import { AdminService } from './../Services/Admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../Services/Client/client.service';
import { Client } from '../models/Client';
import { Router } from '@angular/router';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentClient: Client | null = null;
  currentadmin: Admin | null = null;
  dropdownVisible = false;
  constructor(private clientservice: ClientService, private adminService: AdminService, private router: Router) { }
  ngOnInit(): void {

    this.currentClient = this.clientservice.getClient();
    this.currentadmin = this.adminService.getadmin();
  }
  // ngOnInit(): void {
  //   // Subscribe to the current client observable
  //   this.clientservice.getClient.subscribe((client: Client) => {
  //     if (client != null) {
  //       this.currentClient = client;
  //       console.log('client ' + client + " " + this.currentClient);
  //     }
  //   });

  //   // Subscribe to the current admin observable
  //   this.authService.currentAdmin.subscribe((admin) => {
  //     if (admin != null) {
  //       this.currentAdmin = admin;
  //       console.log('admin ' + admin + " " + this.currentAdmin);
  //     }
  //   });

  //   // Fetch the current admin from localStorage if the app is reloaded or a session exists
  //   const newadmin = this.authService.getAdmin();
  //   if (newadmin != null) {
  //     this.currentAdmin = newadmin;
  //   } else {
  //     console.log('newadmin null');
  //   }

  //   // Fetch the current client from localStorage if the app is reloaded or a session exists
  //   if (!this.currentClient) {
  //     const clientFromStorage = this.authService.getClient();
  //     console.log('clientFromStorage ' + clientFromStorage);
  //     if (clientFromStorage) {
  //       this.currentClient = clientFromStorage;
  //     } else {
  //       console.log('No client found in storage');
  //     }
  //   }
  // }

  getCurrentClient(): Client | null {
    return this.clientservice.getClient();
  }

  getcurrentadmin(): Admin | null {
    return this.adminService.getadmin();
  }

  logout() {
    this.clientservice.signout();
    this.currentClient = null;
    this.router.navigate(['/Accueil']);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
