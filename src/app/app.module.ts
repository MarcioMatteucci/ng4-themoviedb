// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { MyToastOptions } from './my-toast-options';

import { MarkdownModule } from 'angular2-markdown';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { AboutComponent } from './components/about/about.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchTvComponent } from './components/search-tv/search-tv.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { CastComponent } from './components/cast/cast.component';
import { SearchComponent } from './components/search/search.component';

// Services
import { ThemoviedbService } from './services/themoviedb.service';
import { AuthenticateService } from './services/authenticate.service';
import { UserService } from './services/user.service';

// Guards
import { AuthGuard } from './guards/auth.guards';
import { NotAuthGuard } from './guards/notAuth.guards';

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
    LoginComponent,
    ProfileComponent,
    SearchTvComponent,
    TvShowComponent,
    CastComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [
    ThemoviedbService,
    AuthenticateService,
    UserService,
    AuthGuard,
    NotAuthGuard,
    { provide: ToastOptions, useClass: MyToastOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
