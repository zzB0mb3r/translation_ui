import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/translation', pathMatch: 'full' },
  { path: 'translation', loadChildren: () => import('./modules/translation/translation.module').then(m => m.TranslationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
