import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { SignUpComponent } from "./components/auth/sign-up/sign-up.component";
import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { BookListComponent } from "./components/book/book-list/book-list.component";
import { BookFormComponent } from "./components/book/book-form/book-form.component";
import { BookDetailComponent } from "./components/book/book-detail/book-detail.component";
import { PagenotfoundComponent } from "./components/pagenotfound/pagenotfound.component";
import { ProfilDetailComponent} from "./components/profil/profil-detail/profil-detail.component";
import { ProfilFormComponent} from "./components/profil/profil-form/profil-form.component";
import {ProfilViewComponent} from "./components/profil/profil-view/profil-view.component";

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'book-list', canActivate: [AuthGuardService], component: BookListComponent},
  {path: 'book-form', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'book-form/:id', canActivate: [AuthGuardService], component: BookFormComponent},
  {path: 'book-detail', canActivate: [AuthGuardService], component: BookDetailComponent},
  {path: 'book-detail/:id', canActivate: [AuthGuardService], component: BookDetailComponent},
  {path: 'profil-view/:idUser', canActivate: [AuthGuardService], component: ProfilViewComponent},
  {path: 'profil-detail/:idUser', canActivate: [AuthGuardService], component: ProfilDetailComponent},
  {path: 'profil-form/:idUser', canActivate: [AuthGuardService], component: ProfilFormComponent},
  {path: '', redirectTo: 'book-list', pathMatch: 'full'},
  {path: 'page-not-found', component: PagenotfoundComponent},
  {path: '**', redirectTo: 'page-not-found'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
