import {Component, OnChanges, OnInit} from '@angular/core';
import {PersonagesService} from "../service/personages.service";

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent {

  constructor(
    private persoService: PersonagesService
  ) { }
}
