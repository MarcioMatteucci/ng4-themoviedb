import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { Movie } from '../../models/Movie';
import { Genre } from '../../models/Genre';
import { Review } from '../../models/Review';
import { People } from '../../models/People';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id: string;
  movie: Movie;
  genres: Genre[];
  reviews: Review[];
  cast: People[];
  hasReviews = false;
  hasCrew = false;
  director: string;

  constructor(
    private themoviedbService: ThemoviedbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.themoviedbService.getMovieById(id)
          .subscribe(data => {
            this.movie = data;
            this.genres = this.movie.genres;
            // console.log(this.movie);
          });

        this.themoviedbService.getReviewsByMovieId(id)
          .subscribe(data => {
            if (data.total_results > 0) {
              this.hasReviews = true;
              this.reviews = data.results;
              // console.log(this.reviews);
            }
          });

        this.themoviedbService.getCastByMovieId(id)
          .subscribe(data => {
            if (data) {
              this.hasCrew = true;
              // console.log(data);
              this.director = data.crew.find(p => p.job === 'Director').name;
              this.cast = data.cast;
              // console.log(this.cast);
              // console.log(this.cast[0].character);
            }
          });
      });
  }

}
