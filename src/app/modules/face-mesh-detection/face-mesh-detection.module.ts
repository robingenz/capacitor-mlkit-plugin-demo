import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { FaceMeshDetectionRoutingModule } from './face-mesh-detection-routing.module';

import { FaceMeshDetectionPage } from './face-mesh-detection.page';
import {
  KeysPipe,
  ContourTitlePipe,
  ContourDescriptionPipe,
  ContourPipe,
} from './face-mesh-detection.pipe';

@NgModule({
  imports: [SharedModule, FaceMeshDetectionRoutingModule],
  declarations: [
    FaceMeshDetectionPage,
    KeysPipe,
    ContourTitlePipe,
    ContourDescriptionPipe,
    ContourPipe,
  ],
})
export class FaceMeshDetectionModule {}
