import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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

@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    PokemonComponent,
    PokemonsComponent,
    PokemonCardComponent,
    ToUpperCaseFirstPipe,
    CustomIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
