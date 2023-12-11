import { Component, OnInit ,Input } from '@angular/core';

import { pokemon, resultPokemon  } from './../../models/pokemon.model'
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {

  @Input() pokemonId: string | null = null;
  pokemon!: pokemon;

  constructor(
    private pokedexService: PokedexService
  ){}

  ngOnInit() {
    if(this.pokemonId){
      this.pokedexService.getPokemon(this.pokemonId)
      .subscribe(data => {
        this.pokemon = data;
      })
    }
  }

}
