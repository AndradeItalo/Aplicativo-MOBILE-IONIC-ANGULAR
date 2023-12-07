import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesEscolaPage } from './detalhes-escola.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesEscolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesEscolaPageRoutingModule {}
