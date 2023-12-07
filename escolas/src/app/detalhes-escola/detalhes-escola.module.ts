import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesEscolaPageRoutingModule } from './detalhes-escola-routing.module';

import { DetalhesEscolaPage } from './detalhes-escola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesEscolaPageRoutingModule
  ],
  declarations: [DetalhesEscolaPage]
})
export class DetalhesEscolaPageModule {}
