import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PersonagesService} from "./service/personages.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tp2';

  enSession: boolean = false
  monObserSession$!: Observable<boolean>

  constructor(
    public monService: PersonagesService
  ) {
    this.monObserSession$ = this.monService.isSessionValid();
  }

  async ngOnInit() {
    // this.monService.ngOnInit()
  }

}
