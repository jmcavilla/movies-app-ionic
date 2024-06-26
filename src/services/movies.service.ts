import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private API_URL_AUTH = 'https://api.themoviedb.org/3/authentication';
  private API_URL = 'https://api.themoviedb.org/3';
  private API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTYxNWVhZDRkYWZmYjVlNjE2ODc4YTAzMzQwYTNjZSIsInN1YiI6IjY2MjAwYzZjYTZmZGFhMDE2MzZiM2MyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1xQWyvnnakBMtl1yEnBaSam-sqH8cc39VrViDcKu3kU';
  public IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w500'
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.API_KEY}`
    }
  };

  getMovies( page = "1" ) {
    return fetch(`${this.API_URL}/discover/movie?include_adult=false&language=en-US&page=${page}`, this.options);
  }

  getMovieByName(name:string){
    return fetch(`${this.API_URL}/search/movie?query=${name}`, this.options);
  }

}