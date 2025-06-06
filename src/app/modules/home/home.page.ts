import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public plugins = [
    {
      name: 'Barcode Scanning',
      url: '/barcode-scanning',
    },
    {
      name: 'Document Scanner',
      url: '/document-scanner',
    },
    {
      name: 'Face Detection',
      url: '/face-detection',
    },
    {
      name: 'Face Mesh Detection',
      url: '/face-mesh-detection',
    },
    {
      name: 'Selfie Segmentation',
      url: '/selfie-segmentation',
    },
    {
      name: 'Subject Segmentation',
      url: '/subject-segmentation',
    },
    {
      name: 'Translation',
      url: '/translation',
    },
  ];

  constructor() {}
}
