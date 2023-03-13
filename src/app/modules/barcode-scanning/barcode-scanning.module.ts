import { NgModule } from '@angular/core';

import { BarcodeScanningRoutingModule } from './barcode-scanning-routing.module';

import { SharedTestingModule } from '@tests/modules';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanningPage } from './barcode-scanning.page';

@NgModule({
  imports: [SharedTestingModule, BarcodeScanningRoutingModule],
  declarations: [BarcodeScanningPage, BarcodeScanningModalComponent],
})
export class BarcodeScanningModule {}
