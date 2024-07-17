interface IDamage  {
    damage_type: {
        index: string;
        name: string;
        url: string;
    };
    damage_at_slot_level?: {
        "2": string;
    };
    damage_at_character_level?: {
        "1": string;
        "5": string;
        "11": string;
        "17": string;
    };
}

interface IClasses {
    index: string;
    name: string;
    url: string;
}

export interface ISpells {
    // _id: string;
    higher_level?: string[] ;
    index: string;
    name: string;
    desc: string[];
    range: string;
    components: string[];
    ritual: boolean;
    duration: string;
    attack_type?: string;
    damage?: IDamage;
    school?: {
        index: string;
        name: string;
        url: string;
    };
    classes?: IClasses[];
    subclasses?: IClasses[];
    concentration: boolean;
    casting_time: string;
    level: number;
    url: string;
}

export interface ISpellAffiche {
    qty: number;
    spells: ISpells;
}

export interface ISpellReference {
  id: string,
  character_id: string,
  reference: string,
  qty: number
}
