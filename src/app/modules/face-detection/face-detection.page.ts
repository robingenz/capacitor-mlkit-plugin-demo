import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FaceDetection, PerformanceMode, LandmarkMode, LandmarkType, ContourMode, ContourType, ClassificationMode, Face, Point } from '@capacitor-mlkit/face-detection';
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
  });

  public faces: Face[] = [{
    bounds: { left: 0, top: 0, right: 0, bottom: 0 },
    headEulerAngleX: 0.0,
    headEulerAngleY: -14.054030418395996,
    headEulerAngleZ: -55.007488250732422,
    landmarks: [{
      type: LandmarkType.LeftEye,
      position: { x: 945.869323730469, y: 211.867126464844 },
    }, {
      type: LandmarkType.RightEye,
      position: { x: 971.579467773438, y: 247.257247924805 },
    }, {
      type: LandmarkType.MouthBottom,
      position: { x: 907.756591796875, y: 259.714477539062 },
    }],
    contours: [{
      type: ContourType.NoseBridge,
      points: [{ x: 505.149811, y: 221.201797 }, { x: 506.987122, y: 313.285919 }],
    }, {
      type: ContourType.LeftEye,
      points: [{ x: 505.149811, y: 221.201797 }, { x: 506.987122, y: 313.285919 }],
    }, {
      type: ContourType.UpperLipTop,
      points: [{ x: 505.149811, y: 221.201797 }, { x: 506.987122, y: 313.285919 }],
    }],
    smilingProbability: 0.88979166746139526,
    leftEyeOpenProbability: 0.98635888937860727,
    rightEyeOpenProbability: 0.99258323386311531,
  }];

  private readonly githubUrl = 'https://github.com/robingenz/capacitor-mlkit';

  constructor() { }

  public ngOnInit(): void {
    // this.getDownloadedModels();
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

    const minFaceSize = undefined;
    const enableTracking = undefined;

    const { faces } = await FaceDetection.processImage({
      path,

      performanceMode: performanceMode,

      contourMode: contourMode,
      landmarkMode: landmarkMode,

      classificationMode: classificationMode,

      minFaceSize: minFaceSize,
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
    return $.join(", ");
  }
}
