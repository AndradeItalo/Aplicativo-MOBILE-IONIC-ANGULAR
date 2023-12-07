import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detalhes-escola',
    loadChildren: () => import('./detalhes-escola/detalhes-escola.module').then( m => m.DetalhesEscolaPageModule)
  },
  {
    path: 'detalhes-escola',
    loadChildren: () => import('./detalhes-escola/detalhes-escola.module').then( m => m.DetalhesEscolaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
