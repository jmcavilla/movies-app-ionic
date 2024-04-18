import { Component, OnInit } from '@angular/core';
import { MovieData } from 'src/services/movies';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public movies: Array<MovieData> = [];
  public pageMovies: number = 1;
  constructor( private moviesService: MoviesService) {
    
  }

  ngOnInit() {
    this.getMovies(`${this.pageMovies}`)
  }

  async getMovies(pageMovies){
    const resp = await this.moviesService.getMovies(`${pageMovies}`)
    const data = await resp.json();
    this.movies = [...this.movies, ...data.results];

    console.log(this.movies)
  }


  async handleInput(event) {
    const query = event.target.value.toLowerCase();
    const resp = await (await this.moviesService.getMovieByName(query)).json();
    this.movies = resp && resp.results;
  }

  getMoreMovies() {
    this.pageMovies += 1;
    this.getMovies(`${this.pageMovies}`);
  }

}
