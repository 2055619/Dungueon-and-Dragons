import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { CarteComponent } from './carte/carte.component';
import { CompendiumComponent } from './compendium/compendium.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { MagasinComponent } from './magasin/magasin.component';
import { PersonnageComponent } from './personnage/personnage.component';
import {PorfolioComponent} from "./porfolio/porfolio.component";
import {DungeonComponent} from "./dungeon/dungeon.component";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  {
    path: 'dungeon',
    component: DungeonComponent,
    children: [{
      path: 'personnage',
      component: PersonnageComponent
    },  {
      path: 'magasin',
      component: MagasinComponent
    },
    {
      path: 'compendium',
      component: CompendiumComponent
    },
    {
      path: 'inventaire',
      component: InventaireComponent
    },
    {
      path: 'carte',
      component: CarteComponent
    },
    {
      path: 'administration',
      component: AdministrationComponent
    }]
  },
  { path: 'portfolio',
    component: PorfolioComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/portfolio',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot( routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
