import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { MlkitTranslationPageRoutingModule } from './mlkit-translation-routing.module';

import { MlkitTranslationPage } from './mlkit-translation.page';

@NgModule({
  imports: [SharedModule, MlkitTranslationPageRoutingModule],
  declarations: [MlkitTranslationPage],
})
export class MlkitTranslationPageModule {}
