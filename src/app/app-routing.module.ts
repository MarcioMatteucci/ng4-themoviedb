import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { MovieComponent } from './components/movie/movie.component';
import { SuccessfulLoginComponent } from './components/successful-login/successful-login.component';

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
    component: SearchMovieComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path: 'successfullogin',
    component: SuccessfulLoginComponent
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
