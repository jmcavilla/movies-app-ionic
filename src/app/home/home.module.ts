import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MoviecardComponent } from '../components/moviecard/moviecard.component';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StarRatingModule.forRoot()
  ],
  declarations: [HomePage, MoviecardComponent]
})
export class HomePageModule {}
