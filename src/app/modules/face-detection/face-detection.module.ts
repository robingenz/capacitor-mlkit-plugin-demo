import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { FaceDetectionRoutingModule } from './face-detection-routing.module';

import { FaceDetectionPage } from './face-detection.page';

@NgModule({
  imports: [SharedModule, FaceDetectionRoutingModule],
  declarations: [FaceDetectionPage],
})
export class FaceDetectionModule {}
