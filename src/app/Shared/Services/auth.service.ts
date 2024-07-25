import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false; // État d'authentification

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    // Ici, vous implémenteriez la logique d'authentification réelle,
    // par exemple, en appelant un service d'API qui vérifie les informations d'identification.
    // Pour cet exemple, nous simulons une authentification réussie.
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return of(true); // Utilisation de RxJS pour retourner un Observable avec true
    } else {
      return of(false); // Retourne Observable avec false si l'authentification échoue
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    // Redirection vers la page de connexion après la déconnexion
    this.router.navigate(['/login']);
  }

 
}
