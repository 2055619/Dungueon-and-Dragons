import { Component, OnInit } from '@angular/core';
import {PersonagesService} from "../../service/personages.service";
import {DndService} from "../../service/dnd.service";

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {

  constructor(
    protected persoService: PersonagesService,
    protected dndService: DndService
  ) { }

  ngOnInit(): void {
  }

  getSpells(){
    return this.persoService.getSpellsPersoActif()
  }

  getSpellCount(qty: number): boolean[] {
    return Array<boolean>(qty);
  }

  displayLevel(level: number): string {

    switch(level) {
      case 0:
        return "Cantrip "
      case 1:
        return "1st level"
      case 2:
        return "2nd level "
      case 2:
        return "3rd level "

      default:
        return `${level}th level`
    }

    return `${level}${(level==1)?'st':'th'} level`;
  }

}
