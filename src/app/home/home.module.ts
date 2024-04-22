import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MoviecardComponent } from '../components/moviecard/moviecard.component';
import { StarRatingModule } from 'angular-star-rating';
import { HeaderComponent } from '../components/header/header.component';
import { MoviedetailComponent } from '../components/moviedetail/moviedetail.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StarRatingModule.forRoot()
  ],
  declarations: [HomePage, MoviecardComponent, HeaderComponent, MoviedetailComponent]
})
export class HomePageModule {}
