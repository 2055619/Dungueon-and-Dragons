import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IEquipDnd, IEquipments} from "../models/equipments";
import {ISpells} from "../models/spells";
import {ITrait} from "../models/character";


interface IDataDndEquip{
  count: number;
  results: IEquipDnd[]
}

@Injectable({
  providedIn: 'root'
})

export class DndService {
  private monServiceID = Math.random();

  constructor(
    private http_client: HttpClient
  ) {}

  getEquipment(reference: string): Observable<IEquipments>{
    return this.http_client.get<IEquipments>(environment.serveurDND + reference).pipe(
      map(dataserver => dataserver)
    )
  }

  getSpell(index: string): Observable<ISpells>{
    return this.http_client.get<ISpells>(environment.serveurDND + index).pipe(
      map(dataserver => dataserver)
    )
  }

  getTrait(index: string): Observable<ITrait>{
    return this.http_client.get<ITrait>(environment.serveurDND + index).pipe(
      map(dataserver => dataserver)
    )
  }

  getToutEquipement(): Observable<IDataDndEquip> {
    return this.http_client.get<IDataDndEquip>(environment.serveurDND + "equipment")
  }

  getEquipementParUrl(url: string): Observable<IEquipments>{
    // console.log("Get equipement")
    return this.http_client.get<IEquipments>("https://www.dnd5eapi.co" + url).pipe(
      map(dataserver => dataserver)
    )
  }
}
