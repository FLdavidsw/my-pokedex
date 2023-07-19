import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { pokemon, pokemonPagination, resultPokemon } from './../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnChanges {

@Input() pokemonChosen!: pokemon;
@Input() showCard = false;
@Output() stateCard = new EventEmitter<boolean>();

closePokemonCard(){
  this.showCard = !this.showCard;
  this.stateCard.emit(this.showCard);
}

ngOnChanges(changes: SimpleChanges){
  console.log(changes);
}

}
