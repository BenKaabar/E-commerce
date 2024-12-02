import { AdminService } from './../../Services/Admin/admin.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';

@Component({
  selector: 'app-signupadmin',
  templateUrl: './signupadmin.component.html',
  styleUrls: ['./signupadmin.component.css']
})
export class SignupadminComponent {
  username = '';
  password = '';
  constructor(private adminService: AdminService, private router: Router) { }

  signup() {
    this.adminService.signup(this.username, this.password).subscribe(response => {
      if (typeof response === 'string') {
        console.error('Erreur:', response);
      } else {
        const admin = this.adminService.getadmin();
        this.router.navigate(["/signinadmin"]);
        console.log('admin enregistré dans sessionStorage:', admin);
      }
    }
    )
  }
}
