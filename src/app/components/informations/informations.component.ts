import { Component, OnInit } from '@angular/core';
import { ICharactere } from 'src/app/models/character';
import {PersonagesService} from "../../service/personages.service";

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  constructor(
    private persoService: PersonagesService
  ) { }

  ngOnInit(): void {
  }

  getCharactere(): ICharactere{
    let charatere!: ICharactere
    this.persoService.getObsPerso().asObservable().subscribe({
      next: (char) => charatere = char[0]
    })

    return charatere
  }

}
