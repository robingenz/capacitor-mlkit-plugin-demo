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
      name: 'Face Detection',
      url: '/face-detection',
    },
    {
      name: 'Translation',
      url: '/translation',
    },
  ];

  constructor() {}
}
