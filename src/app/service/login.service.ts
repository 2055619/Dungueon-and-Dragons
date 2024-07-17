import { Injectable } from '@angular/core';
import {PersonagesService} from "./personages.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PorfolioComponent} from "../porfolio/porfolio.component";
import {IMessage} from "../models/message";
import * as repl from "repl";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username!: string
  success = false;
  lastError = '';

  messages: IMessage[] = [];

  constructor(
  ) {
    let tmp = localStorage.getItem("userName")
    if ( tmp !== null){
      this.username = tmp
    }
  }

  peutModifier(username: string, sessionValide: boolean): boolean{
    return (this.username === username && sessionValide);
  }

}
