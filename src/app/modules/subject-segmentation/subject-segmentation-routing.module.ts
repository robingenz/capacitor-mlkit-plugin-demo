import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectSegmentationPage } from './subject-segmentation.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectSegmentationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectSegmentationRoutingModule {}
