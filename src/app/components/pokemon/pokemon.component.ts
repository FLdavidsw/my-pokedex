import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { pokemon, resultPokemon  } from './../../models/pokemon.model'
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemonData!: resultPokemon;
  @Output() namePokemon = new EventEmitter<string>();

  pokemon!: pokemon;

  constructor (
    private pokedexService: PokedexService
  ) {}

  ngOnInit(){
    this.getPokemon(this.pokemonData.name);
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  getPokemon(nameOrId: string | number){
    this.pokedexService.getPokemon(nameOrId).
    subscribe(data => {
      this.pokemon = data;
      this.pokemon.img = data.sprites.other['official-artwork'].front_default;
      //this.stateLoadSpinner = false;
    })
  }

  showDetail(){
    this.namePokemon.emit(this.pokemon.name);
  }

}
