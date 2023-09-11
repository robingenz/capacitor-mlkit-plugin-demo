import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelfieSegmentationPage } from './selfie-segmentation.page';

const routes: Routes = [
  {
    path: '',
    component: SelfieSegmentationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfieSegmentationRoutingModule {}
