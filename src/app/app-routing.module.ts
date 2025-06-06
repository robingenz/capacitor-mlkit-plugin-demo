import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'barcode-scanning',
    loadChildren: () =>
      import('./modules/barcode-scanning/barcode-scanning.module').then(
        (m) => m.BarcodeScanningModule,
      ),
  },
  {
    path: 'document-scanner',
    loadChildren: () =>
      import('./modules/document-scanner/document-scanner.module').then(
        (m) => m.DocumentScannerModule,
      ),
  },
  {
    path: 'face-detection',
    loadChildren: () =>
      import('./modules/face-detection/face-detection.module').then(
        (m) => m.FaceDetectionModule,
      ),
  },
  {
    path: 'face-mesh-detection',
    loadChildren: () =>
      import('./modules/face-mesh-detection/face-mesh-detection.module').then(
        (m) => m.FaceMeshDetectionModule,
      ),
  },
  {
    path: 'selfie-segmentation',
    loadChildren: () =>
      import('./modules/selfie-segmentation/selfie-segmentation.module').then(
        (m) => m.SelfieSegmentationModule,
      ),
  },
  {
    path: 'subject-segmentation',
    loadChildren: () =>
      import('./modules/subject-segmentation/subject-segmentation.module').then(
        (m) => m.SubjectSegmentationModule,
      ),
  },
  {
    path: 'translation',
    loadChildren: () =>
      import('./modules/translation/translation.module').then(
        (m) => m.TranslationModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
