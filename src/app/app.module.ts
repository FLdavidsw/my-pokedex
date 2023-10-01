import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { SwiperModule } from 'swiper/angular';
import { register } from 'swiper/element/bundle';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
//command to add angular material correctly: ng add @angular/material 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgComponent } from './components/img/img.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { ToUpperCaseFirstPipe } from './pipes/to-upper-case-first.pipe';
import { CustomIdPipe } from './pipes/custom-id.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';

register();

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    PokemonComponent,
    PokemonsComponent,
    PokemonCardComponent,
    ToUpperCaseFirstPipe,
    CustomIdPipe,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //SwiperModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
