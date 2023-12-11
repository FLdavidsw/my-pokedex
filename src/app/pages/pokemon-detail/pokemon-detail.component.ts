import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { PokedexService } from '../../services/pokedex.service';
import { pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit{

  pokemonName: null | string = null;
  pokemonChosen!: pokemon;
  pokemonGif: string | null = null;
  pokemonUrlSpecies: string | null = null;
  evolutions = [];

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService
  ){}

  ngOnInit(): void {
    
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.pokemonName = params.get('name');
        if(this.pokemonName){
          return this.pokedexService.getPokemon(this.pokemonName);
        }
        return [];
      })
    )
    .subscribe(data => {
      this.pokemonChosen = data;
      this.pokemonUrlSpecies = data.species.url;
      if(this.pokemonChosen.sprites.versions?.['generation-v']['black-white'].animated?.front_default){
        this.pokemonGif = this.pokemonChosen.sprites.versions?.['generation-v']['black-white'].animated?.front_default;
      }
      if(this.pokemonUrlSpecies){
        this.pokedexService.getPokemonEvolutions(this.pokemonUrlSpecies).
        subscribe(data => {
          this.evolutions = [];
          this.evolutions = this.evolutions.concat(data.chain.species);
          if(data.chain.evolves_to[0]){
            this.evolutions = this.evolutions.concat(data.chain.evolves_to[0].species);
          }
          if(data.chain.evolves_to[0].evolves_to[0]){
            this.evolutions = this.evolutions.concat(data.chain.evolves_to[0].evolves_to[0].species);
          }
        });
      }
    })
  }
}
