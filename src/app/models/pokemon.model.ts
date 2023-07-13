
export interface pokemon {
    abilities:                Ability[];
    forms:                    Species[];
    height:                   number;
    id:                       number;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
    img?:                     string;
}

export interface Ability {
    ability:   Species;
    is_hidden: boolean;
    slot:      number;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    'official-artwork': OfficialArtwork;
    //animated?:          Sprites;
    //versions?:          Versions;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Species;
    version_group:     Species;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface Type {
    slot: number;
    type: Species;
}

export interface resultPokemon {
    name: string;
    url: string;
}

export interface pokemonPagination {
    count: number;
    next: string;
    previous: string | undefined | null;
    results: resultPokemon[];
}