import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { SubjectSegmentationRoutingModule } from './subject-segmentation-routing.module';

import { SubjectSegmentationPage } from './subject-segmentation.page';

@NgModule({
  imports: [SharedModule, SubjectSegmentationRoutingModule],
  declarations: [SubjectSegmentationPage],
})
export class SubjectSegmentationModule {}
