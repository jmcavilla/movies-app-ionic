import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { MovieData } from 'src/services/movies';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  public movies: Array<MovieData> = [];
  public pageMovies: number = 1;
  public isModalOpen: boolean = false;
  public selMovie: MovieData;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies(`${this.pageMovies}`)
  }

  async getMovies(pageMovies) {
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

  getMoreMovies(event) {
    console.log("ENTRO")
    this.pageMovies += 1;
    this.getMovies(`${this.pageMovies}`);
    event.target.complete();
  }

  openModalMovie(movie:MovieData){
    this.isModalOpen = true;
    this.selMovie = movie;
  }

  cancel() {
    this.isModalOpen = false;
  }

  confirm() {
    this.isModalOpen = false;
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }
}
