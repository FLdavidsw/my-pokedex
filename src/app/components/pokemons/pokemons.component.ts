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
          this.pokemons = this.pokemons.concat(this.pokemon);
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
      console.log(this.pokemonChosen, this.statusPokemonCard);
    });
  }

  togglePokemonCard(stateCard: boolean) {
    this.statusPokemonCard = stateCard;
  }


}
