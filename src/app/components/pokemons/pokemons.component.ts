import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { map, switchMap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

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
  stateLoadSpinner = false;
  isButtonDisabled: boolean = true;
  limit = 20;
  offset = 0;

  constructor(
    private pokedexService: PokedexService
  ){
    
  }

  ngOnInit(){
    this.getPokemonsPagination(this.limit, this.offset)
  }

  loadMorePokemons(){
    this.getPokemonsPagination(this.limit, this.offset);
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

  getPokemonsPagination(limit: number, offset: number) {
    this.pokedexService.getAllPokemon(limit, offset)
    .subscribe(data => {
      this.pokemonsPagination = this.pokemonsPagination.concat(data);
      this.results = data['results'];
      console.log(this.results);
      this.offset += this.limit;
      for (let result of this.results) {
        this.pokedexService.getPokemon(result.name)
        .pipe(delay(1500))
        .subscribe(data => {
          this.pokemon = data;
          this.pokemon.img = data.sprites.other['official-artwork'].front_default;
          this.pokemons = this.pokemons.concat(this.pokemon);
        });
      }
      });
  }

}
