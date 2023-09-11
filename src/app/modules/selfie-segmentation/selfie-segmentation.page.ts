import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  ProcessImageResult,
  SelfieSegmentation,
} from '@capacitor-mlkit/selfie-segmentation';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Capacitor } from '@capacitor/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-selfie-segmentation',
  templateUrl: './selfie-segmentation.page.html',
  styleUrls: ['./selfie-segmentation.page.scss'],
})
export class SelfieSegmentationPage {
  public formGroup = new UntypedFormGroup({
    width: new UntypedFormControl(512),
    height: new UntypedFormControl(),
    confidence: new UntypedFormControl(9),
  });
  public result: ProcessImageResult | undefined;

  private readonly githubUrl = 'https://github.com/robingenz/capacitor-mlkit';

  constructor(private readonly domSanitizer: DomSanitizer) {}

  public openOnGithub(): void {
    window.open(this.githubUrl, '_blank');
  }

  public pinFormatter(value: number): string {
    return `${value / 10.0}`;
  }

  public async processImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ multiple: false });
    const path = files[0]?.path;
    if (!path) {
      return;
    }

    const width = this.formGroup.get('width')?.value;
    const height = this.formGroup.get('height')?.value;
    const confidence = this.formGroup.get('confidence')?.value;

    const result = await SelfieSegmentation.processImage({
      path,
      width: width,
      height: height,
      confidence: confidence / 10.0,
    });
    this.result = result;
  }

  public convertPathToWebPath(path: string): SafeUrl {
    const fileSrc = Capacitor.convertFileSrc(path);
    return this.domSanitizer.bypassSecurityTrustUrl(fileSrc);
  }
}
