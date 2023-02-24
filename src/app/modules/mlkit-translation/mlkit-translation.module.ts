import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MlkitTranslationPageRoutingModule } from './mlkit-translation-routing.module';

import { MlkitTranslationPage } from './mlkit-translation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MlkitTranslationPageRoutingModule,
  ],
  declarations: [MlkitTranslationPage],
})
export class MlkitTranslationPageModule {}
