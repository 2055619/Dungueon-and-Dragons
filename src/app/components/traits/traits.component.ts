import { Component, OnInit } from '@angular/core';
import {ICharactere, ITrait} from 'src/app/models/character';
import {PersonagesService} from "../../service/personages.service";
import {DndService} from "../../service/dnd.service";

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.css']
})
export class TraitsComponent implements OnInit{

  constructor(
    private persoService: PersonagesService,
    private dndService: DndService
  ) { }

  ngOnInit() {
  }

  getTrait(): ITrait[]{
    return this.persoService.getTraits();
  }

}
