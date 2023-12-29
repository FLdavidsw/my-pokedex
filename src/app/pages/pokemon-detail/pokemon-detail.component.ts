import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  idNext: number | null = null;
  nameNext: string | null = null;
  idPrevious: number | null = null;
  namePrevious: string | null = null;
  pokemonGif: string | null = null;
  pokemonUrlSpecies: string | null = null;
  evolutions = [];

  constructor(
    private route: ActivatedRoute,
    private pokedexService: PokedexService,
    private location: Location,
    private router: Router
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
  goToPrevious(){
    this.idPrevious = this.pokemonChosen.id-1;
    this.pokedexService.getPokemon(this.idPrevious)
    .subscribe(pokemon =>{
      this.namePrevious = pokemon.name;
      this.router.navigate([`/pokemon/${this.namePrevious}`])
    });
  }
  //updating the next pokemon
  goToNext(){
    this.idNext = this.pokemonChosen.id+1;
    this.pokedexService.getPokemon(this.idNext)
    .subscribe(pokemon =>{
      this.nameNext = pokemon.name;
      this.router.navigate([`/pokemon/${this.nameNext}`])
    });
  }

  goToBack() {
    //this.location.back();
    this.router.navigate(['/home'])
  }
}
