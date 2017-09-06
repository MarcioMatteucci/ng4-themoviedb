import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { AboutComponent } from './components/about/about.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchTvComponent } from './components/search-tv/search-tv.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { SearchComponent } from './components/search/search.component';

// Guards
import { AuthGuard } from './guards/auth.guards';
import { NotAuthGuard } from './guards/notAuth.guards';

const routes: Routes = [
  // Ruta Default manda al Home
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'identify',
    component: IdentifyComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tv/:id',
    component: TvShowComponent
  },
  // Cualquier Ruta incorrecta manda al Home (Siempre abajo de todas las demas)
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
