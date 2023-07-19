import { Component, Input, Output, EventEmitter } from '@angular/core';

import { pokemon,  } from './../../models/pokemon.model'

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {

  @Input() pokemon!: pokemon;
  @Output() namePokemon = new EventEmitter<string>();

  constructor () {}

  showDetail(){
    this.namePokemon.emit(this.pokemon.name);
  }

}
