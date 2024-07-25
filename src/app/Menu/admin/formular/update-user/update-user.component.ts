import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../../../Shared/Services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId: string = ''; // Propriété pour stocker l'identifiant de l'utilisateur à mettre à jour
  user: User = { id: '', name: '', role: '' }; // Propriété pour stocker les détails de l'utilisateur à mettre à jour

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Récupérer l'identifiant de l'utilisateur depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userService.getUserById(id).subscribe(
        (user) => {
          if (user) {
            this.user = user; // Assigner l'utilisateur récupéré
          } else {
            console.error('Utilisateur non trouvé pour l\'identifiant :', id);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        }
      );
    } else {
      console.error('Aucun identifiant d\'utilisateur trouvé dans l\'URL.');
    }
  }

  submitForm(): void {
    this.userService.updateUser(this.user);
    this.router.navigate(['/Admin']);
  }
}
