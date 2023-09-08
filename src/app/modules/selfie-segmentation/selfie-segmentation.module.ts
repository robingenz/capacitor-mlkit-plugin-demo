import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { SelfieSegmentationRoutingModule } from './selfie-segmentation-routing.module';

import { SelfieSegmentationPage } from './selfie-segmentation.page';

@NgModule({
  imports: [SharedModule, SelfieSegmentationRoutingModule],
  declarations: [SelfieSegmentationPage],
})
export class SelfieSegmentationModule {}
