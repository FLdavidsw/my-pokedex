import { Component, OnInit } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';

import { PokedexService } from './../../services/pokedex.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  regions: any[] = [];

  constructor(
    private pokedexService: PokedexService
  ){ }

    ngOnInit() {
      this.getRegions();
    }

  getRegions(){
    this.pokedexService.getLocations().
    subscribe(data => {
      this.regions = this.regions.concat(data.results);
      console.log(this.regions);
    });
  }
}
