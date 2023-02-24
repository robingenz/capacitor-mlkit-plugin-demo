import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MlkitTranslationPage } from './mlkit-translation.page';

const routes: Routes = [
  {
    path: '',
    component: MlkitTranslationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MlkitTranslationPageRoutingModule {}
