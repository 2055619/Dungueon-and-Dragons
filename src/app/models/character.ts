
export interface ICharactere {
    id: string;
    name: string;
    statistics: { [ key : string ]: number }
    race: string;
    player: string;
    classe : string;
    sousclasses: string;
    level: number;
    background: string;
    synopsis: string;
    owner: string;
    image: string;
    health: number;
    currentHealth: number;
    traits: {
        trait: string;
        description: string;
    }[];
    // Should be computed
    armorClass: number;
    initiative: number;
    speed: number;
}

export interface ITraitRef{
  id: string;
  character_id: string,
  trait: string | null,
  name: string | null,
  description: string | null
}

export interface ITrait{
  index: string
  name: string
  url: string
  desc: [string]
  races: [{
    index: string
    name: string
    url: string
  }]
  subraces: [{
    index: string
    name: string
    url: string
  }]
  proficiencies: [{
    index: string
    name: string
    url: string
  }]
}

