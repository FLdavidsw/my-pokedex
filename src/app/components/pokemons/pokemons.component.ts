import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { pokemon, pokemonPagination, resultPokemon } from './../../models/pokemon.model';
import { PokedexService } from './../../services/pokedex.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit{

  colorTypes: object = {"normal": '#B6F0EF', "fire": '#FB251B', "water": '#1BA0FB', "grass": '#1ACB35', "flying": '#90D6FA', "fighting": '#F58D25',
                "poison": '#BE29C1', "electric": '#FFFF00', "ground": '#C55710', "rock": '#903F0A', "psychic": '#EC4895', "ice": '#00FFFB', "bug": '#6F8F2A',
                "ghost": '#95849E', "steel": '#A3B1B2', "dragon": '#77EEB6', "dark": '#8C8593', "fairy": '#EE2F54'}
  colorType!: string;
  types: string[] = [];
  pokemon!: pokemon;
  pokemonChosen!: pokemon;
  pokemons: pokemon[] = []
  pokemonsPagination: pokemonPagination[] = [];
  results: resultPokemon[] = [];
  statusPokemonCard = false;
  limit = 40;
  offset = 0;

  constructor(
    private pokedexService: PokedexService
  ){
    
  }

  ngOnInit(){
    this.pokedexService.getAllPokemon(this.limit, this.offset)
    .subscribe(data => {
      this.pokemonsPagination = this.pokemonsPagination.concat(data);
      this.results = data['results'];
      for (let i = 0; i < this.results.length; i++) {
        this.pokedexService.getPokemon(this.results[i].name)
        .subscribe(data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other['official-artwork'].front_default;
          /*for (var i = 0; i < this.pokemon.types.length; i++) {
            this.colorType = this.colorAssign(this.colorTypes, this.pokemon.types[i]);
            this.types = this.types.concat(this.colorType);
            this.pokemon.colorType = this.types;
            for (let [key, value] of Object.entries(this.colorTypes)) {
              if (this.pokemon.types[i].type.name.toLowerCase() === key) {
                this.pokemon.colorType = value;
                console.log(this.pokemon.colorType)
              }
            }  */
          //this.pokemon.colorType = this.types;
          console.log(this.pokemon.colorType);
          this.pokemons = this.pokemons.concat(this.pokemon);
          this.types = [];
        });
      }
    });
  }

  showPokemonCard(name: string) {
    this.statusPokemonCard = true;
    this.pokedexService.getPokemon(name)
    .subscribe(data => {
      this.pokemonChosen = data;
      this.pokemonChosen.img = data.sprites.other['official-artwork'].front_default;
    });
  }

  //Here, we are catching the card's current state from the Pokemon card component.
  togglePokemonCard(stateCard: boolean) {
    this.statusPokemonCard = stateCard;
  }

  colorAssign(colorTypes: object, Type: any) {
    for (let [key, value] of Object.entries(colorTypes)) {
      if (Type.type.name === key) {
        return value;
      }
    }
  }

}
