import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import { HomeComponent } from './Shared/home/home.component';
import { AddTransferComponent } from './Shared/add-transfer/add-transfer.component';
import { MenuComponent } from './Menu/menu/menu.component';
import { AdminComponent } from './Menu/admin/admin.component';
import { CreateUserComponent } from './Menu/admin/formular/create-user/create-user.component';
import { UpdateUserComponent } from './Menu/admin/formular/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',component: HomeComponent },
  { path: 'AddTransfer',component: AddTransferComponent},
  {path: 'Menu',component: MenuComponent},
  {path: 'Admin',component: AdminComponent},
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

