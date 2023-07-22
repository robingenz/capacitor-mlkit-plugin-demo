import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  FaceDetection,
  PerformanceMode,
  LandmarkMode,
  LandmarkType,
  ContourMode,
  ContourType,
  ClassificationMode,
  Face,
  Point,
} from '@capacitor-mlkit/face-detection';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-face-detection',
  templateUrl: './face-detection.page.html',
  styleUrls: ['./face-detection.page.scss'],
})
export class FaceDetectionPage implements OnInit {
  public readonly performanceMode = PerformanceMode;

  public readonly contourMode = ContourMode;
  public readonly landmarkMode = LandmarkMode;

  public readonly classificationMode = ClassificationMode;

  public formGroup = new UntypedFormGroup({
    performanceMode: new UntypedFormControl(PerformanceMode.Fast),

    contourMode: new UntypedFormControl(ContourMode.None),
    landmarkMode: new UntypedFormControl(LandmarkMode.None),

    classificationMode: new UntypedFormControl(ClassificationMode.None),

    minFaceSize: new UntypedFormControl(1),
    enableTracking: new UntypedFormControl(false),
  });

  public faces: Face[] = [];

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

    const performanceMode = this.formGroup.get('performanceMode')?.value;

    const contourMode = this.formGroup.get('contourMode')?.value;
    const landmarkMode = this.formGroup.get('landmarkMode')?.value;

    const classificationMode = this.formGroup.get('classificationMode')?.value;

    const minFaceSize = this.formGroup.get('minFaceSize')?.value;
    const enableTracking = this.formGroup.get('enableTracking')?.value;

    const { faces } = await FaceDetection.processImage({
      path,

      performanceMode: performanceMode,

      contourMode: contourMode,
      landmarkMode: landmarkMode,

      classificationMode: classificationMode,

      minFaceSize: minFaceSize / 10,
      enableTracking: enableTracking,
    });
    this.faces = faces;
  }

  public getLandmarkType(type: LandmarkType) {
    return LandmarkType[type];
  }
  public getContourType(type: ContourType) {
    return ContourType[type];
  }
  public getPoint(point: Point) {
    return `(${point.x}, ${point.y})`;
  }
  public getPoints(points: Point[]) {
    const $ = [];
    for (const point of points) {
      $.push(this.getPoint(point));
    }
    return $.join(', ');
  }
}
