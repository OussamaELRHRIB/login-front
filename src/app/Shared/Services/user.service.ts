import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor() {
    // Retrieve users from localStorage on service initialization                            
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: string): Observable<User | undefined> {
    return of(this.users.find(user => user.id === id));
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers(); // Save users after update
    }
  }

  createUser(newUser: User): void {
    // Generate a unique ID for the new user
    newUser.id = (this.users.length + 1).toString();
    this.users.push(newUser);
    this.saveUsers(); // Save users after creation
  }

  deleteUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1); // Utilise splice pour supprimer l'utilisateur du tableau
      console.log('Utilisateur supprimé :', user);
    }
    this.saveUsers(); // Save users after deletion
  }

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
