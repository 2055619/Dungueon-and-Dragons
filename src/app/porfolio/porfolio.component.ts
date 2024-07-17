import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {LoginPageComponent} from "../login-page/login-page.component";
import {PersonagesService} from "../service/personages.service";
import {IMessage} from "../models/message";
import {Projet} from "../models/projet";

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  message: IMessage = {userid: this.monService.idPersonnage, name: this.log.username, email: "", telephone: "", message: ""};

  lesProjets: Projet[] = [{
    titre: "Dungeon & Dragon",
    auteur: "Louis-Philippe Forget",
    image: "./assets/Images/projet1.png",
    desc: "Ceci est une page web affichant différent personnage de dungeon et dragon",
    lien: "/dungeon/personnage"
  }]

  erreur: string = "";
  constructor(
    private log: LoginService,
    private monService: PersonagesService
  ) { }

  ngOnInit(): void {
    this.erreur = "";
  }

  send(){
    // this.message.message = this.unMessage;

    if (this.monService._sessionIsValid && this.message.message.length !== 0){
      this.monService.postMessage(this.message)
      console.log("Message: " + this.message + " est envoyé");

      this.message = {userid: "", name: "", email: "", telephone: "", message: ""};
      this.erreur = "Message envoyé Bonne journée";

    }else {
      this.erreur = "Message Non envoyé";
    }
  }

}
