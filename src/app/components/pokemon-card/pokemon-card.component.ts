import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { pokemon, pokemonPagination, resultPokemon } from './../../models/pokemon.model';

register();

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent{

@Input() pokemonChosen!: pokemon;
@Input() showCard = false;
@Output() stateCard = new EventEmitter<boolean>();

urlLogoImg = "./../../../assets/icons/Poké_Ball_icon.svg.png";

closePokemonCard(){
  this.showCard = !this.showCard;
  this.stateCard.emit(this.showCard);
}


}
