export interface IEquipments {
    special?: string[];
    index: string;
    name: string;
    weight?: number;
    desc: string[];
    equipment_category: {
        index: string;
        name: string;
        url: string;
    };
    gear_category?: {
        index: string;
        name: string;
        url: string;
    };
    cost?: {
        quantity: number;
        unit: string;
    };
    // Magic items
    rarity?: {
        name: string;
    };
    variants?: string[];
    variant?: boolean;
    properties?: any[];
    url: string;
    tool_category?: string;
    weapon_category?: string;
    weapon_range?: string;
    category_range?: string;
    damage?: {
        damage_dice: string;
        damage_type: {
            index: string;
            name: string;
            url: string;
        };
    };
    range?: {
        normal: number;
        long?: number
    };
    two_handed_damage?: {
        damage_dice: string;
        damage_type: {
            index: string;
            name: string;
            url: string;
        };
    };
    throw_range?: {
        normal: number;
        long: number;
    };
    armor_category?: string;
    armor_class?: {
        base: number;
        dex_bonus: boolean;
    };
    str_minimum?: number;
    stealth_disadvantage?: boolean;
    contents?: string[];
}

export interface IInventory {
    qty: number;
    equipment: IEquipments
    equipped: boolean
}

export interface IEquipementReference{
  "id": string,
  "character_id": string,
  "reference": string,
  "qty": number,
  "equipped": boolean
}

export interface IEquipementPost{
  "reference": string,
  "qty": number,
  "equipped": boolean
}

export interface IEquipDnd{
  index: string
  name:string
  url:string
}
