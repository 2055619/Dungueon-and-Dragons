import { Component, OnInit } from '@angular/core';
import { ICharactere } from 'src/app/models/character';
import {PersonagesService} from "../../service/personages.service";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-health-bar',
  templateUrl: './health-bar.component.html',
  styleUrls: ['./health-bar.component.css']
})
export class HealthBarComponent implements OnInit {

  myCharacter!: ICharactere
  disable: boolean = true

  constructor(
    private persoService: PersonagesService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
  }

  getCharactere(): ICharactere{
    if (this.persoService.getObsPerso() !== undefined){
      this.persoService.getObsPerso().asObservable().subscribe({
        next: (char) =>{
          this.myCharacter = char[0]
        }
      })
    }else {
      this.persoService.getPersonnage(this.persoService.idPersonnage).subscribe({
        next: (char) => this.myCharacter = char[0]
      })
    }
    this.peutModifierVie(this.myCharacter.owner)

    return this.myCharacter
  }

  peutModifierVie(username: string){
    this.disable = !this.login.peutModifier(username, this.persoService._sessionIsValid);
  }

  getCouleur(): string {
    const percent = this.getCharactere().currentHealth / this.getCharactere().health;

    if (percent > 0.5 ) return "bg-success";
    if (percent > 0.2 ) return "bg-warning";
    return "bg-danger";
  }

  incrementHealth(): void {
    if (this.getCharactere().currentHealth < this.getCharactere().health)  {
      console.log("Incrementing :",  this.getCharactere().currentHealth);
      this.getCharactere().currentHealth++;
    }
    console.log("Bof");
    this.patchHp()
  }

  decrementHealth(): void {
    if (this.getCharactere().currentHealth !== 0)
    {
      console.log("Decrementing :",  this.getCharactere().currentHealth);
      this.getCharactere().currentHealth--;
    }
    this.patchHp()
  }

  patchHp(){
    this.persoService.patchHp({currentHealth: this.getCharactere().currentHealth})
  }

}
