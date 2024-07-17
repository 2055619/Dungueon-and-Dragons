import { Injectable } from '@angular/core';
import {from, interval, map, zip} from "rxjs";

interface IjetDe {
  val: number,
  desize: number
}

@Injectable({
  providedIn: 'root'
})

export class DesService {

  desExpression: string = '3d4+2d10';
  jetDeDes: IjetDe[] = [];
  valid = true;


  constructor() {

  }

  lanceDesAsync(): void {
    // Cree un vecteur de des a brasser
    this.valid = true;
    const groupeDe = this.desExpression.split("+");
    this.jetDeDes = [];
    const maxDes = [];
    let aleternate: boolean = false;

    // where dice are computed in the pipe.

    for (const group of groupeDe) {
      const requete = group.split('d');

      if (requete.length === 2
        && Number.parseInt(requete[0]) > 0
        && Number.parseInt(requete[1]) > 0
      ) {
        maxDes.push(
          ...new Array<number>(Number.parseInt(requete[0])).fill(Number.parseInt(requete[1]))
        );
      } else {
        this.valid = false;
        return;
      }
    }

    // Max 2 secondes pour tout afficher
    const delay = 1000 / maxDes.length;

    zip(
      from(maxDes),
      interval(delay)
    ).pipe(
      map(
        ([maxDe, compteur]) => {
          return {
            desize: maxDe,
            val: Math.ceil(Math.random() * maxDe)
          };
        }
      ),
    ).subscribe(
      {
        next: (de) => this.jetDeDes.push(de)
      }
    )
  }

}
