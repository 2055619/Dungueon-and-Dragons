import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnageComponent } from './personnage/personnage.component';
import { HealthBarComponent } from './components/health-bar/health-bar.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DiceComponent } from './components/dice/dice.component';
import { InformationsComponent } from './components/informations/informations.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SpellsComponent } from './components/spells/spells.component';
import { TraitsComponent } from './components/traits/traits.component';
import { LogsComponent } from './components/logs/logs.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NameComponent } from './name/name.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MagasinComponent } from './magasin/magasin.component';
import { CompendiumComponent } from './compendium/compendium.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { CarteComponent } from './carte/carte.component';
import { AdministrationComponent } from './administration/administration.component';
import { ArmesComponent } from './components/armes/armes.component';
import { StatisticRowComponent } from './statistic-row/statistic-row.component';
// Reference : https://medium.com/wineofbits/angular-2-routing-404-page-not-found-on-refresh-a9a0f5786268
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { DungeonComponent } from './dungeon/dungeon.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    PersonnageComponent,
    HealthBarComponent,
    StatisticsComponent,
    DiceComponent,
    InformationsComponent,
    InventoryComponent,
    SpellsComponent,
    TraitsComponent,
    LogsComponent,
    BottomBarComponent,
    ErrorPageComponent,
    TopBarComponent,
    NameComponent,
    SideBarComponent,
    MagasinComponent,
    CompendiumComponent,
    InventaireComponent,
    CarteComponent,
    AdministrationComponent,
    ArmesComponent,
    StatisticRowComponent,
    PorfolioComponent,
    DungeonComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,

  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
