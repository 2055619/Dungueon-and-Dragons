import { Component, OnInit } from '@angular/core';
import {IEquipDnd, IEquipments, IInventory} from "../models/equipments";
import {PersonagesService} from "../service/personages.service";
import {DndService} from "../service/dnd.service";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {BehaviorSubject} from "rxjs";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {

  equipPossible!: IEquipDnd[]
  // lesEquipements: IInventory[] = []
  lesEquipements: IEquipDnd[] = []

  countEquip!: number

  descEquip!: BehaviorSubject<IEquipments>


  constructor(
    protected persoService: PersonagesService,
    protected dndService: DndService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getLesEquipements()
  }

  getDescEquipement(url: string) {
    this.dndService.getEquipementParUrl(url).subscribe({
      next: (equip) => {
        if (this.descEquip === undefined){
         this.descEquip = new BehaviorSubject<IEquipments>(equip);
        }
        if (equip.desc.length === 0){
          equip.desc[0] = "Aucune description disponible"
        }
        this.descEquip.next(equip)
      }
    })
  }

  getLesEquipements(): IEquipDnd[] {
    if (this.countEquip === undefined || this.equipPossible.length <= 1){
      let res = this.dndService.getToutEquipement()
      res.subscribe({
        next: (equip) => {
          this.countEquip = equip.count
          this.equipPossible = equip.results
        }
      })
    }
    return this.equipPossible;
  }

  drop(event: CdkDragDrop<IEquipDnd[]>){
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  postNouvelEquipement(){
    console.log("Post")
    for (let equip of this.lesEquipements){
      let ref = equip.url.split('/')
      this.persoService.postEquipement({reference: ref[2]+'/'+ref[3] ,qty: 1, equipped: false})
    }

    this.lesEquipements = []
  }

  peutModifier(): boolean{
    let modifiable: boolean = false
    this.persoService.getObsPerso().asObservable().subscribe({
      next: (perso) => {
        modifiable = this.loginService.peutModifier(perso[0].owner, this.persoService._sessionIsValid)
      }
    })
    return modifiable;
  }
}
