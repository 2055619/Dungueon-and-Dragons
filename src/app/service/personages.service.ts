import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, filter, map, Observable, Subject, switchMap, tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import {ICharactere, ITrait, ITraitRef} from "../models/character";
import {IEquipementPost, IEquipementReference, IEquipments, IInventory} from "../models/equipments";
import {ISpellAffiche, ISpellReference, ISpells} from "../models/spells";
import {DndService} from "./dnd.service";
import * as diagnostics_channel from "diagnostics_channel";
import {LoginService} from "./login.service";
import {IMessage, IMessageGet} from "../models/message";

interface IToken {
  error: string,
  data: string // Token
}

interface IDataperso {
  error: string;
  data: ICharactere[];
}

interface IDataLePerso {
  error: string;
  data: ICharactere;
}

// interface IDataPersoComplet {
//   error: string;
//   data: IPersoComplet;
// }
// interface IPersoComplet {
//   character: ICharactere,
//   spells: ISpellRef[],
//   traits: ITrait[],
//   equipments: IInventoryRef[]
// }

interface IDataEquipement {
  error: string;
  data: IEquipementReference[];
}

interface IDataSpell {
  error: string;
  data: ISpellReference[];
}

interface IDataTrait {
  error: string;
  data: ITraitRef[];

}


interface IValidation {
  [id:string]: string[];
}
/*
{
  classes: string[];
  traits: string[];
  alignments: string[];
  subclasses: string[];
  spells: string[];
  skills: string[];
  races: string[];
  equipments: string[];
}
*/

@Injectable({
  providedIn: 'root'
})
export class PersonagesService  {

  private token: string = '';
  _sessionIsValid = false;
  private monServiceID = Math.random();
  // Create a place to send notification on session changes
  private _sessionNotifier$ = new BehaviorSubject<boolean>(this._sessionIsValid);

  private _validationData: IValidation = {};

  public lesPersonnages: ICharactere[] = [];

  protected static _persoChoisi$: BehaviorSubject<ICharactere[]>
  protected static _toutPerso$: Observable<ICharactere[]>;
  protected static equipement: IInventory[];
  protected static traits: ITrait[]
  protected static spells: ISpellAffiche[]
  idPersonnage!: string

  constructor(
    private http_client: HttpClient,
    private dndService: DndService,
    private loginService: LoginService
  ) {
    this.ngOnInit()

    const token = localStorage.getItem("token")
    if (token) {
      console.log("Restoring token from storage");
      this.token = token;
      this.testSession();
    }

    // Pas de subscription car ici le service ne sera jamais detruit.
    this.http_client.get<{ data: IValidation }>(environment.serveur + 'validation_data').subscribe(
      {
        next: (data) => {
          this._validationData = data.data;
        }
      }
    )
  }

  async ngOnInit() {
    let tmp = localStorage.getItem("persoID")
    if (tmp !== null){
      this.idPersonnage = tmp
    }
    else {
      this.idPersonnage = "demochar"
    }
    this.setLesPersos()

    this.getPersonnage(this.idPersonnage).subscribe({
      next: (char) => {
        PersonagesService._persoChoisi$ = new BehaviorSubject<ICharactere[]>(char)
        this.idPersonnage = char[0].id
        this.chargeEquipement(char[0].id)
        this.setTrait(char[0].id)
        this.setSpells(char[0].id)
      }
    })
  }

  getObsPerso(): BehaviorSubject<ICharactere[]>{
    return PersonagesService._persoChoisi$
  }

  getEquipement(): IInventory[] {
    return PersonagesService.equipement
  }

  setNewPerso(id: string){
    this.getPersonnage(id).subscribe({
      next: (char) => {
        PersonagesService._persoChoisi$.next(char)
        this.idPersonnage = char[0].id
        this.chargeEquipement(char[0].id)
        this.setTrait(char[0].id)
        this.setSpells(char[0].id)
        localStorage.setItem("persoID", ''+char[0].id)
      }
    })

  }

  getToutPerso(): Observable<ICharactere[]>{
    return PersonagesService._toutPerso$
  }

  setLesPersos(){
    PersonagesService._toutPerso$ = this.getPersonnages()
  }

  getOwner() {
    let owner!:string
    PersonagesService._persoChoisi$.asObservable().subscribe({
      next: (perso) => owner = perso[0].owner
    })

    return owner
  }

  getTraits(): ITrait[]{
    return PersonagesService.traits
  }

  setTrait(id: string){
    PersonagesService.traits = []

    this.getTrait(id)
      .subscribe({
        next:(refTrait) => {
          for (const letraitRef of refTrait) {
            if (letraitRef.trait !== null){
              this.dndService.getTrait(letraitRef.trait)
                .subscribe({
                  next: (leTrait) => PersonagesService.traits.push(leTrait)
                })
            }
          }
        }
      })

  }

  getSpellsPersoActif(): ISpellAffiche[]{
    return PersonagesService.spells
  }

  setSpells(id: string){
    PersonagesService.spells = []
    this.getSpells(id)
      .subscribe({
        next: (sp) => {
          for (const spKey of sp) {
            this.dndService.getSpell(spKey.reference)
              .subscribe({
                next: (spell) => {
                  PersonagesService.spells.push({qty: spKey.qty, spells: spell})
                }
              })
          }
        },
        error: (er) => {
          console.log("Erreur: " + er)
        }
      })

  }


  getValidation(type: string): string[] {
    if (this._validationData[type]) {
      return [...this._validationData[type]];
    } else {
      return []
    }
  }
  getMonServiceID(): number {
    return this.monServiceID;
  }

  testSession(): void {
    // Will start a process to validate that session is valid
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
         Authorization: this.token
      })
    };

    this.http_client.get(environment.serveur + 'secret',httpOptions).subscribe(
      {
        next: (_) => {
          this._sessionIsValid = true;
          this._sessionNotifier$.next(this._sessionIsValid)
        },
        error: (_) => {
          this._sessionIsValid = false;
          this._sessionNotifier$.next(this._sessionIsValid)
        }
      }
    )
  }

  isSessionValid(): Observable<boolean> {
    return this._sessionNotifier$.asObservable();
  }

  creeSession(username: string, password: string): Observable<any> {
    return this.http_client.post<any>(environment.serveur + 'token',
      {
        username: username,
        password: password
      }
    ).pipe(
      // Save token when it is passing
      tap(
        (data) => {
          console.log(data);

          this.token = data.data;
          // Save in Local storae
          localStorage.setItem("token", data.data);
          // Notify the world
          this._sessionIsValid = true;
          localStorage.setItem("userName", ''+username)
          this.loginService.username = username

          this._sessionNotifier$.next(this._sessionIsValid)
        }
      )
    )
  }

  getPersonnages(): Observable<ICharactere[]> {
    return this.http_client.get<IDataperso>(environment.serveur + 'characters').pipe(
      map(dataserver => dataserver.data)
    )
  }

  getPersonnage(id: string): Observable<ICharactere[]>{
    this.http_client.get<IDataLePerso>(environment.serveur + 'character/'+id).pipe(
      map(dataserver => {
        console.log(dataserver)
        dataserver.data
      })
    )
    return this.http_client.get<IDataperso>(environment.serveur + 'character/'+id).pipe(
      map(dataserver => dataserver.data)
    )
  }

  getEquipements(id: string): Observable<IEquipementReference[]>{
    return this.http_client.get<IDataEquipement>(environment.serveur + 'equipments/'+id).pipe(
      map(dataserver => dataserver.data)
    );
  }

  getSpells(id: string): Observable<ISpellReference[]>{
    return this.http_client.get<IDataSpell>(environment.serveur + 'spells/'+id).pipe(
      map(dataserver => dataserver.data)
    );
  }

  getTrait(id: string): Observable<ITraitRef[]>{
    return this.http_client.get<IDataTrait>(environment.serveur + 'traits/'+id).pipe(
      map(dataserver => dataserver.data)
    );
  }

  chargeEquipement(id: string){
    let equipem: IInventory[] = []

    this.getEquipements(id)
      .subscribe({
      next: (inv) => {
        for (let i=0; i<inv.length; i++){
          this.dndService.getEquipment(inv[i].reference).subscribe({
            next: (equip) => {
              let nouvEquip = {qty: inv[i].qty, equipment: equip, equipped: inv[i].equipped};
              equipem.push(nouvEquip)
            }
          })
        }
      }
    })
    PersonagesService.equipement = equipem
  }

  getMessage(id: string): Observable<IMessage[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    return this.http_client.get<IMessageGet>(environment.serveur + "contact/"+id, httpOptions).pipe(map(
      dataserver => dataserver.data
    ))
  }

  postMessage(message: IMessage){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    console.log(message.name)
    this.http_client.put<any>(environment.serveur + 'contact/'+ message.userid, message, httpOptions).subscribe({
      next:(val) => {
        console.log(val)
    }
    })
  }

  postEquipement(equipementPost: IEquipementPost){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    this.http_client.post<any>(environment.serveur + 'equipments/'+ this.idPersonnage, equipementPost,httpOptions).subscribe({
      next: (message) => {
        console.log(message)
      }
    })
  }

  deleteEquipement(id: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    this.http_client.delete<any>(environment.serveur + 'equipments/'+ this.idPersonnage + '/'+ id, httpOptions).subscribe({
      next: (message) => {
        console.log(message.data)
      }
    })

  }


  patchHp(vie: {currentHealth: number}){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };

    this.http_client.patch(environment.serveur + "health/" + this.idPersonnage, vie, httpOptions).subscribe({
      next: (message) => {
        console.log(message)
      }
    })
  }
}
