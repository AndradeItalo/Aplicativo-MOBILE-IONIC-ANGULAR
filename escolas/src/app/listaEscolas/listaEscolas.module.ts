import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListaEscolasPage } from './listaEscolas.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpClientModule } from '@angular/common/http';

import { ListaEscolasPageRoutingModule } from './listaEscolas-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    HttpClientModule,
    ListaEscolasPageRoutingModule
  ],
  declarations: [ListaEscolasPage]
})
export class ListaEscolasPageModule {}
