import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../../../Shared/Services/user.service'; 

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = {
    id: '',
    name: '',
    role: ''
    
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  submitForm() {
    
    this.userService.createUser(this.user);
    console.log('Utilisateur créé avec:', this.user);

    this.router.navigate(['/Admin']); 
  }

}
