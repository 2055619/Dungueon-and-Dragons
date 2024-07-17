import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonagesService } from '../service/personages.service';
import {PorfolioComponent} from "../porfolio/porfolio.component";
import { IMessage } from "../models/message";
import {LoginService} from "../service/login.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  messages!: BehaviorSubject<IMessage[]>

  constructor(
    protected loginService: LoginService,
    private monService: PersonagesService
  ) { }

  password: string = ''
  username: string = ''


  ngOnInit() {
    if (this.messages === undefined){
      this.messages = new BehaviorSubject<IMessage[]>([{userid: "", name: "", email: "", telephone: "", message: "Aucun message pour le moment"}])
    }
    this.getMessageObs()
  }

  getMessageObs() : Observable<IMessage[]>{
      if (this.loginService.username.length !== 0 || this.messages.value.length <= 1) {
        this.monService.getMessage(this.loginService.username).subscribe({
          next: (mess) => {
            this.messages.next(mess)
          }
        })
      }
    return this.messages.asObservable()
  }

  creeSession() {
    this.loginService.username = this.username
    this.monService.creeSession(this.username, this.password).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.loginService.success = true;
          this.chargePersonnages();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.loginService.lastError = err.error.message;
        }
      }
    );

    this.getMessageObs()
  }

  chargePersonnages() {
    this.monService.setLesPersos()
  }

}
