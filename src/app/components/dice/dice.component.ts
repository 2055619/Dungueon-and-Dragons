import { Component, OnInit } from '@angular/core';
import { asyncScheduler, toArray, combineLatest, concatMap, delay, from, interval, map, Observable, of, scheduled, take, tap, throttle, timer, zip, race, merge, defer } from 'rxjs';
import {DesService} from "../../service/des.service";

interface IjetDe {
  val: number,
  desize: number
};

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  desExpression: string = '3d4+2d10';
  jetDeDes: IjetDe[] = this.desService.jetDeDes;
  valid = true;

  constructor(
    private desService: DesService
  ) { }

  ngOnInit(): void {
  }

  lanceDesAsync(): void {
    this.desService.desExpression = this.desExpression;
    this.desService.lanceDesAsync();

    this.jetDeDes = this.desService.jetDeDes;
    this.valid = this.desService.valid;

  }

  // lanceDesAsync(): void {
  //   // Cree un vecteur de des a brasser
  //   this.valid = true;
  //   const groupeDe = this.desExpression.split("+");
  //   this.jetDeDes = [];
  //   const maxDes = [];
  //   let aleternate: boolean = false;
  //
  //   // where dice are computed in the pipe.
  //
  //   for (const group of groupeDe) {
  //     const requete = group.split('d');
  //
  //     if (requete.length === 2
  //       && Number.parseInt(requete[0]) > 0
  //       && Number.parseInt(requete[1]) > 0
  //     ) {
  //       maxDes.push(
  //         ...new Array<number>(Number.parseInt(requete[0])).fill(Number.parseInt(requete[1]))
  //       );
  //     } else {
  //       this.valid = false;
  //       return;
  //     }
  //   }
  //
  //   // Max 2 secondes pour tout afficher
  //   const delay = 1000 / maxDes.length;
  //
  //   zip(
  //       from(maxDes),
  //       interval(delay)
  //     ).pipe(
  //       map(
  //         ([maxDe, compteur]) => {
  //           return {
  //             desize: maxDe,
  //             val: Math.ceil(Math.random() * maxDe)
  //           };
  //         }
  //       ),
  //     ).subscribe(
  //       {
  //         next: (de) => this.jetDeDes.push(de)
  //       }
  //     )
  // }

}
