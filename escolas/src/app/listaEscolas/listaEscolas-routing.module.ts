import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEscolasPage } from './listaEscolas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEscolasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaEscolasPageRoutingModule {}
