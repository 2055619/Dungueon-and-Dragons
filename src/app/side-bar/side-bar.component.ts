import {Component, OnChanges, OnInit} from '@angular/core';
import {PersonagesService} from "../service/personages.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  image: string = "";

  constructor(
    private persoService: PersonagesService
  ) { }

  ngOnInit(): void {
  }


  getImage(): string{
    this.persoService.getObsPerso().asObservable().subscribe({
      next: (char) => {
        this.image = char[0].image
      }
    })

    return this.image
  }



}
