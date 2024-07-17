import {Component, OnChanges, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEquipments, IInventory } from 'src/app/models/equipments';
import {PersonagesService} from "../../service/personages.service";
import {DndService} from "../../service/dnd.service";
import {ICharactere} from "../../models/character";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnChanges {
  currentPage = 0;
  maxItemParPage = 10;
  displayMin = 0;
  mySubscription!: Subscription;
  persoActif!: ICharactere;
  action: string = "action"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected persoService: PersonagesService,
    protected dndService: DndService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getPerso()

    this.mySubscription = this.route.queryParamMap.subscribe(
      params => {
        if (params.get('page')) {
          const thePage = params.get('page');
          if (thePage) {
            this.currentPage = parseInt(thePage)-1;
          }
        }
      });
  }

  getPerso(){
    if (this.persoService.getObsPerso() !== undefined){
      this.persoService.getObsPerso().asObservable().subscribe({
        next: (char) =>{
          this.persoActif = char[0]
        }
      })
    }else {
      this.persoService.getPersonnage(this.persoService.idPersonnage).subscribe({
        next: (char) => this.persoActif = char[0]
      })
    }
  }


  pageDEquipement(): IInventory[] {
    return this.persoService.getEquipement().slice(
      this.currentPage * this.maxItemParPage,
      this.currentPage * this.maxItemParPage + this.maxItemParPage
    );
  }

  pagesCount(): number {
    return Math.ceil(this.persoService.getEquipement().length / this.maxItemParPage);
  }

  pagesCountItems(): number[] {
    return Array<number>(Math.min(3, this.pagesCount()));
  }

  setPage(index: number): void {
    this.currentPage = index;
    this.router.navigate([],  { queryParams: { page: index+1 } });
  }

  incPages(): void {
    this.displayMin++;
  }

  decPages(): void {
    this.displayMin--;
  }

  ngOnChanges(): void {
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

  actionChoisi(item: IInventory) {
    if (this.action === "jeter"){
      this.jetterEquipement(item.equipment.index)
    } else if (this.action === "equiper") {
      this.equipeEquipement(item)
    }
  }

  jetterEquipement(nom: string){
    console.log("Jetter")
    this.persoService.getEquipements(this.persoService.idPersonnage).subscribe({
      next: (equipements) =>{
        for (let equip of equipements){
          if (equip.reference.split('/')[2] === nom){
            this.persoService.deleteEquipement(equip.id)
          }
        }
      }
    })
    this.persoService.chargeEquipement(this.persoService.idPersonnage)
  }

  equipeEquipement(item: IInventory){
    this.jetterEquipement(item.equipment.index)
    this.persoService.postEquipement({reference: item.equipment.url, qty: item.qty, equipped: !item.equipped})

    this.persoService.chargeEquipement(this.persoService.idPersonnage)
  }


}
