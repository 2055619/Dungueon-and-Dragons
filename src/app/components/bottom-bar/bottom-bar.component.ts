import { Component, OnInit } from '@angular/core';
import { ICharactere } from 'src/app/models/character';
import {PersonagesService} from "../../service/personages.service";

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {

  constructor(
    private persoService: PersonagesService
  ) { }

  ngOnInit(): void {
  }

  getCharactere(): ICharactere{
    let character!: ICharactere

    this.persoService.getObsPerso().asObservable().subscribe({
      next:(char) =>  character = char[0]
    })

    return character
  }

}
