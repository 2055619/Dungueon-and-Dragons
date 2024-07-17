import { Component, HostBinding, OnInit } from '@angular/core';
import {PersonagesService} from "../service/personages.service";

@Component({
  selector: 'app-personnage',
  templateUrl: './personnage.component.html',
  styleUrls: ['./personnage.component.css']
})
export class PersonnageComponent implements OnInit {

  // Set on the selecteur mais je regle pas le probleme car on est dans un router element.
  /*
  @HostBinding('class') get class() {
    return "g-0"
  };
  */

  constructor(
    private persoService: PersonagesService
  ) { }

  ngOnInit(): void {
    // this.persoService.ngOnInit()
  }

}
