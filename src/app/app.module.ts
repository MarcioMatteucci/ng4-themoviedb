import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { AboutComponent } from './components/about/about.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';

// Services
import { ThemoviedbService } from './services/themoviedb.service';
import { AuthenticateService } from './services/authenticate.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SearchMovieComponent,
    AboutComponent,
    IdentifyComponent,
    MovieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ThemoviedbService, AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
