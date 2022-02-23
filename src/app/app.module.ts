import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BookFormComponent } from './components/book/book-form/book-form.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProfilViewComponent } from './components/profil/profil-view/profil-view.component';
import { ProfilDetailComponent } from './components/profil/profil-detail/profil-detail.component';
import { ProfilFormComponent } from './components/profil/profil-form/profil-form.component';

import { AuthService } from "./services/auth.service";
import { BooksService} from "./services/books.service";
import { AuthGuardService } from "./services/auth-guard.service";

//Angular Material
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import {MatTabNavPanel} from "@angular/material/tabs";
// import {MomentDateModule} from '@angular/material-moment-adapter';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule} from "@angular/fire/compat/storage";
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    BookListComponent,
    BookDetailComponent,
    BookFormComponent,
    NavigationComponent,
    PagenotfoundComponent,
    ProfilViewComponent,
    ProfilDetailComponent,
    ProfilFormComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    // MomentDateModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,

  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
