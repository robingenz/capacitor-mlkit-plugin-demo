import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TranslationPage } from './translation.page';

const routes: Routes = [
  {
    path: '',
    component: TranslationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationRoutingModule {}
