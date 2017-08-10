import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  searchStr = '';
  movies: Movie[];
  findSomething = false;

  constructor(
    private themoviedbService: ThemoviedbService
  ) { }

  searchMovie() {
    console.log(this.searchStr);
    if (this.searchStr !== '') {
      this.themoviedbService.searchMovie(this.searchStr)
        .subscribe(data => {
          if (data.total_results > 0) {
            this.findSomething = true;
            console.log(data.results);
            this.movies = data.results;
          } else {
            this.findSomething = false;
          }
        });
    }
  }

  ngOnInit() {
  }

}
