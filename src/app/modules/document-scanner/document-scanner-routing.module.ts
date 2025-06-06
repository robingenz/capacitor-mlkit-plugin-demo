import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentScannerPage } from './document-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentScannerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentScannerRoutingModule {}
