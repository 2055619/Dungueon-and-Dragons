import { Component, OnInit } from '@angular/core';
import {PersonagesService} from "../service/personages.service";
import {ICharactere} from "../models/character";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {BehaviorSubject, Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})
export class NameComponent implements OnInit {

  lePerso: string = "";
  personnages: ICharactere[] = [];
  constructor(
    protected persoService: PersonagesService,
    private router: Router,
    private location: Location

  ) { }

  async ngOnInit(): Promise<void> {
    this.chargePersonnage()
    let tmp = localStorage.getItem("persoID")
    if (tmp !== null){
      this.lePerso = tmp
    }
    else {
      this.lePerso = "demochar";
    }

    this.persoChoisi()
  }

  chargePersonnage(): void {
    this.persoService.getToutPerso().subscribe(
      {
        next: (personnages) => this.personnages = personnages
    })
  }

  getPerso(): Observable<ICharactere[]>{
    return this.persoService.getToutPerso()
  }

  persoChoisi(): void{
    this.persoService.setNewPerso(this.lePerso)
  }
}
