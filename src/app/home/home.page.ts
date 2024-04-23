import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, IonModal } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieData } from 'src/services/movies';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  public movies: Array<MovieData> = [];
  public pageMovies: number = 1;
  public isModalOpen: boolean = false;
  public movieEdit: boolean = false;
  public selMovie: MovieData;
  public userData: any;

  paramsSub: Subscription;
  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.activeRoute.params.subscribe(val => {
      // Handle param values here
      const token = localStorage.getItem('token');
      if(token !== null){
        this.getMovies(`${this.pageMovies}`)
      }else{
        this.router.navigate(['/login'])
      }
    });
  }

  public ngOnDestroy(): void {
    // Prevent memory leaks
    this.paramsSub.unsubscribe();
}

  async getMovies(pageMovies, reset = false) {
    const resp = await this.moviesService.getMovies(`${pageMovies}`)
    const data = await resp.json();
    if(reset){
      this.movies = [...data.results];
    }else{
      this.movies = [...this.movies, ...data.results];
    }
  }


  async handleInput(event) {
    const query = event.target.value.toLowerCase();
    if(query){
      const resp = await (await this.moviesService.getMovieByName(query)).json();
      this.movies = resp && resp.results;
    }else{
      this.resetMovies();
    }
  }

  resetMovies () {
    this.pageMovies = 1;
    this.getMovies(`${this.pageMovies}`, true);
  }

  getMoreMovies(event) {
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
    const i = this.movies.findIndex(m => m.id === this.selMovie.id);
    this.movies[i] = this.selMovie;
  }

  editMovie(){
    this.movieEdit = !this.movieEdit;
  }
  onRatingChange(event) {
    this.selMovie.vote_average = event.rating*2;
  }

  get movieRate() {
    return parseInt(this.selMovie.vote_average)
  }

}
