import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  SelfieSegmentation,
  ProcessImageOptions,
  ProcessImageResult,
} from '@capacitor-mlkit/selfie-segmentation';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-selfie-segmentation',
  templateUrl: './selfie-segmentation.page.html',
  styleUrls: ['./selfie-segmentation.page.scss'],
})
export class SelfieSegmentationPage implements OnInit {
  public formGroup = new UntypedFormGroup({
    width: new UntypedFormControl(512),
    height: new UntypedFormControl(),

    confidence: new UntypedFormControl(9),
  });

  pinFormatter(value: number) {
    return `${value / 10.0}`;
  }

  public result: ProcessImageResult = { path: '', width: 0, height: 0 };

  private readonly githubUrl = 'https://github.com/robingenz/capacitor-mlkit';

  constructor() {}

  public ngOnInit(): void {
    return;
  }

  public openOnGithub(): void {
    window.open(this.githubUrl, '_blank');
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
    console.log(result);

    result.path = Capacitor.convertFileSrc(result.path);
    console.log(result);

    this.result = result;
  }
}
