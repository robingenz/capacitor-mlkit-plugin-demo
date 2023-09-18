import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaceMeshDetectionPage } from './face-mesh-detection.page';

const routes: Routes = [
  {
    path: '',
    component: FaceMeshDetectionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaceMeshDetectionRoutingModule {}
