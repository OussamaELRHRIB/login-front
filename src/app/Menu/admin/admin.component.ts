import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../Shared/Services/user.service'; // Assurez-vous d'importer User et UserService correctement

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = []; // Utilisez le type User pour le tableau d'utilisateurs

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
          
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

  addUser() {
    this.router.navigate(['/create-user']);
  }

  editUser(user: User) {
    this.router.navigate(['/update-user', user.id]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user)
  }
}
