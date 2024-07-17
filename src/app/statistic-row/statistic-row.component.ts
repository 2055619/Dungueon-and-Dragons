import { Component, OnInit } from '@angular/core';
import { ICharactere } from '../models/character';
import {PersonagesService} from "../service/personages.service";

@Component({
  selector: 'app-statistic-row',
  templateUrl: './statistic-row.component.html',
  styleUrls: ['./statistic-row.component.css']
})
export class StatisticRowComponent implements OnInit {
  myCharactere!: ICharactere;
  statLookup = [
    // Pourquoi est-ce un mauvais choix???
    { prefix: 'str', suffix: 'enght', couleur: 'bg-danger' },
    { prefix: 'dex',  suffix: 'terity', couleur: 'bg-primary' },
    { prefix: 'con',  suffix: 'stitution', couleur: 'bg-warning' },
    { prefix: 'int',  suffix: 'tellignce', couleur: 'bg-success' },
    { prefix: 'sag',  suffix: 'esse', couleur: 'bg-info' },
    { prefix: 'cha',  suffix: 'risme', couleur: 'bg-dark' }
  ];

  constructor(
    private persoService: PersonagesService
  ) { }

  ngOnInit(): void {
    this.persoService.getObsPerso().asObservable().subscribe({
      next: (char) => {
        this.myCharactere = char[0]
      }
    })
  }

  getModifier(stat: number): string {
    const mod = Math.floor((stat-10)/2)
    return (mod<0)?'-':'+'+ mod.toString();
  }

}
