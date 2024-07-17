import { Component, OnInit } from '@angular/core';
import {IEquipementReference, IEquipments, IInventory} from 'src/app/models/equipments';
import {PersonagesService} from "../../service/personages.service";
import {DndService} from "../../service/dnd.service";

@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {

  constructor(
    private persoService: PersonagesService,
    protected dndService: DndService
  ) {}
  ngOnInit(): void {
  }

  equippedArms(): IInventory[] | undefined {
    return this.persoService.getEquipement().filter(
      (eq) => eq.equipped && eq.equipment.weapon_category !== undefined
    );
  }

  getItemsList(q: number): boolean[] {
    return new Array<boolean>(q);
  }
}
