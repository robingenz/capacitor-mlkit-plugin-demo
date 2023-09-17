import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  FaceMesh,
  FaceMeshDetection,
  Point3D,
  UseCase,
} from '@capacitor-mlkit/face-mesh-detection';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-face-mesh-detection',
  templateUrl: './face-mesh-detection.page.html',
  styleUrls: ['./face-mesh-detection.page.scss'],
})
export class FaceMeshDetectionPage implements OnInit {
  public readonly useCase = UseCase;

  public formGroup = new UntypedFormGroup({
    useCase: new UntypedFormControl(UseCase.FaceMesh),
  });

  pinFormatter(value: number) {
    return `${value / 10.0}`;
  }

  public faceMeshs: FaceMesh[] = [];

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

    const useCase = this.formGroup.get('useCase')?.value;

    const { faceMeshs } = await FaceMeshDetection.processImage({
      path,

      useCase: useCase,
    });
    this.faceMeshs = faceMeshs;
  }

  public getPoint(point: Point3D) {
    return `(${point.x}, ${point.y}, ${point.z})`;
  }
  public getPoints(points: Point3D[]) {
    const $ = [];
    for (const point of points) {
      $.push(this.getPoint(point));
    }
    return $.join(', ');
  }
}
