import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listaEscolas',
        loadChildren: () => import('../listaEscolas/listaEscolas.module').then(m => m.ListaEscolasPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then(m => m.FavoritosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/listaEscolas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/listaEscolas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
