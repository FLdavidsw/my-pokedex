import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { pokemon, resultPokemon  } from './../../models/pokemon.model'
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @Input() pokemonName!: string | number;
  @Input() enterButtonPressed?: boolean;
  @Output() namePokemon = new EventEmitter<string>();
  initialName!: string | number;  
  initialState?: boolean;

  pokemon!: pokemon;
  regions: any[] = [];

  constructor (
    private pokedexService: PokedexService
  ) {
  }

  ngOnInit(){
    this.getPokemon(this.pokemonName);
    this.initialName = this.pokemonName;
    this.initialState = this.enterButtonPressed;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.initialName !== this.pokemonName && this.initialState !== this.enterButtonPressed){
      this.getPokemon(this.pokemonName);
      this.initialName = this.pokemonName;
      this.initialState = this.enterButtonPressed;
    }
  }
  getPokemon(nameOrId: string | number){
    this.pokedexService.getPokemon(nameOrId).
    subscribe(data => {
      this.pokemon = data;
      //console.log(this.pokemon.name.split('').length)
      //this.stateLoadSpinner = false;
    })
  }

  showDetail(){
    this.namePokemon.emit(this.pokemon.name);
  }

}
