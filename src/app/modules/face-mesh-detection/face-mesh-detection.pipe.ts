import { Pipe, PipeTransform } from '@angular/core';
import { FaceMeshPoint, Contours } from '@capacitor-mlkit/face-mesh-detection';

const contourType: any = {
  faceOval: {
    title: 'Face Oval',
    description: "The outline of the subject's face.",
  },
  leftEye: {
    title: 'Left Eye',
    description: "The outline of the subject's left eye cavity.",
  },
  leftEyebrowBottom: {
    title: 'Left Eyebrow Bottom',
    description: "The bottom outline of the subject's left eyebrow.",
  },
  leftEyebrowTop: {
    title: 'Left Eyebrow Top',
    description: "The top outline of the subject's left eyebrow.",
  },
  lowerLipBottom: {
    title: 'Lower Lip Bottom',
    description: "The bottom outline of the subject's lower lip.",
  },
  lowerLipTop: {
    title: 'Lower Lip Top',
    description: "The top outline of the subject's lower lip.",
  },
  noseBridge: {
    title: 'Nose Bridge',
    description: "The outline of the subject's nose bridge.",
  },
  rightEye: {
    title: 'Right Eye',
    description: "The outline of the subject's right eye cavity.",
  },
  rightEyebrowBottom: {
    title: 'Right Eyebrow Bottom',
    description: "The bottom outline of the subject's right eyebrow.",
  },
  rightEyebrowTop: {
    title: 'Right Eyebrow Top',
    description: "The top outline of the subject's right eyebrow.",
  },
  upperLipBottom: {
    title: 'Upper Lip Bottom',
    description: "The bottom outline of the subject's upper lip.",
  },
  upperLipTop: {
    title: 'Upper Lip Top',
    description: "The top outline of the subject's upper lip.",
  },
};

@Pipe({ name: 'keys', pure: false })
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    return Object.keys(value);
  }
}

@Pipe({ name: 'contourTitle', pure: false })
export class ContourTitlePipe implements PipeTransform {
  transform(contour: any): any {
    return contourType[contour].title;
  }
}

@Pipe({ name: 'contourDescription', pure: false })
export class ContourDescriptionPipe implements PipeTransform {
  transform(contour: any): any {
    return contourType[contour].description;
  }
}

@Pipe({ name: 'contour', pure: false })
export class ContourPipe implements PipeTransform {
  transform(contours: Contours, contour: any): FaceMeshPoint[] {
    return contours[contour as keyof Contours]!;
  }
}
