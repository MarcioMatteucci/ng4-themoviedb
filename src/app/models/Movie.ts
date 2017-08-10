import { Genre } from './Genre';
import { People } from './People';

export class Movie {
    id: number;
    title: string;
    poster_path: string;
    original_title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
    cast: People[];
}
