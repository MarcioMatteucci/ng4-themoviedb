import { Genre } from './Genre';
import { People } from './People';

export class TvShow {
    id: number;
    name: string;
    original_name: string;
    poster_path: string;
    overview: string;
    first_air_date: string;
    last_air_date: string;
    in_production: boolean;
    vote_average: number;
    rating?: number;
    genres: Genre[];
    cast: People[];
}
