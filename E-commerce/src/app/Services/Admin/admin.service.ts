import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from 'src/app/models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private admins: Admin[] = [
    { id: 1, username: 'admin', password: '111' }
  ];
  private nextId: number = this.admins.length + 1;
  signup(username: string, password: string): Observable<Admin | string> {
    const existingAdmin = this.admins.find(c => c.username === username);
    if (existingAdmin) {
      console.log("Signup failed: Username already exists");
      return of('Username already exists');
    }
    const newAdmin: Admin = {
      id: this.nextId++,
      username,
      password
    };
    this.admins.push(newAdmin);
    // this.setadmin(newAdmin);
    console.log("Signup successfully:", JSON.stringify(newAdmin));
    return of(newAdmin);
  }

  signin(username: string, password: string): Observable<Admin | null> {
    const admin = this.admins.find(c => c.username === username && c.password === password);
    if (admin) {
      this.setadmin(admin);
      console.log("Login successfully:", JSON.stringify(admin));
      return of(admin);
    } else {
      console.log("Login failed");
      return of(null);
    }
  }

  signout(): void {
    sessionStorage.removeItem("admin");
  }
  setadmin(admin: Admin) {
    sessionStorage.setItem('admin', JSON.stringify(admin));
  }
  getadmin(): Admin | null {
    const adminData = sessionStorage.getItem('admin');
    return adminData ? JSON.parse(adminData) : null;
  }



}
