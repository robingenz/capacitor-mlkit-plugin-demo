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
        (m) => m.BarcodeScanningModule
      ),
  },
  {
    path: 'translation',
    loadChildren: () =>
      import('./modules/translation/translation.module').then(
        (m) => m.TranslationModule
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
