import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogService } from '@app/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { Torch } from '@capawesome/capacitor-torch';
import { InputCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scanning',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Scanning</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      @if (isWeb) {
      <video #video autoplay class="video"></video>
      }
      <div #square class="square"></div>
      <div class="zoom-ratio-wrapper">
        <ion-range
          [min]="minZoomRatio"
          [max]="maxZoomRatio"
          [disabled]="minZoomRatio === undefined || maxZoomRatio === undefined"
          (ionChange)="setZoomRatio($any($event))"
        ></ion-range>
      </div>
      @if (isTorchAvailable) {
        <ion-fab slot="fixed" horizontal="end" vertical="bottom">
          <ion-fab-button (click)="toggleTorch()">
            <ion-icon name="flashlight"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      }
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        --background: transparent;
      }

      .square {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        width: 200px;
        height: 200px;
        border: 6px solid white;
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
      }

      .video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .zoom-ratio-wrapper {
        position: absolute;
        left: 50%;
        bottom: 16px;
        transform: translateX(-50%);
        width: 50%;
      }
    `,
  ],
})
export class BarcodeScanningModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  public formats: BarcodeFormat[] = [];
  @Input()
  public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square')
  public squareElement: ElementRef<HTMLDivElement> | undefined;

  @ViewChild('video')
  public videoElement: ElementRef<HTMLVideoElement> | undefined;

  public isTorchAvailable = false;
  public isWeb = Capacitor.getPlatform() === 'web';
  public minZoomRatio: number | undefined;
  public maxZoomRatio: number | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone,
  ) {}

  public ngOnInit(): void {
    Torch.isAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.startScan();
    }, 500);
  }

  public ngOnDestroy(): void {
    this.stopScan();
  }

  public setZoomRatio(event: InputCustomEvent): void {
    if (!event.detail.value) {
      return;
    }
    BarcodeScanner.setZoomRatio({
      zoomRatio: parseInt(event.detail.value as any, 10),
    });
  }

  public async closeModal(barcode?: Barcode): Promise<void> {
    this.dialogService.dismissModal({
      barcode: barcode,
    });
  }

  public async toggleTorch(): Promise<void> {
    await Torch.toggle();
  }

  private async startScan(): Promise<void> {
    // Hide everything behind the modal (see `src/theme/variables.scss`)
    document.querySelector('body')?.classList.add('barcode-scanning-active');

    const options: StartScanOptions = {
      formats: this.formats,
      lensFacing: this.lensFacing,
      videoElement:
        Capacitor.getPlatform() === 'web'
          ? this.videoElement?.nativeElement
          : undefined,
    };

    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();
    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right:
            squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom:
            squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width:
            squareElementBoundingClientRect.width * window.devicePixelRatio,
          height:
            squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;
    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [
            scaledRect.left + scaledRect.width,
            scaledRect.top + scaledRect.height,
          ],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;
    const listener = await BarcodeScanner.addListener(
      'barcodesScanned',
      async (event) => {
        this.ngZone.run(() => {
          const firstBarcode = event.barcodes[0];
          if (!firstBarcode) {
            return;
          }
          const cornerPoints = firstBarcode.cornerPoints;
          if (
            detectionCornerPoints &&
            cornerPoints &&
            Capacitor.getPlatform() !== 'web'
          ) {
            if (
              detectionCornerPoints[0][0] > cornerPoints[0][0] ||
              detectionCornerPoints[0][1] > cornerPoints[0][1] ||
              detectionCornerPoints[1][0] < cornerPoints[1][0] ||
              detectionCornerPoints[1][1] > cornerPoints[1][1] ||
              detectionCornerPoints[2][0] < cornerPoints[2][0] ||
              detectionCornerPoints[2][1] < cornerPoints[2][1] ||
              detectionCornerPoints[3][0] > cornerPoints[3][0] ||
              detectionCornerPoints[3][1] < cornerPoints[3][1]
            ) {
              return;
            }
          }
          listener.remove();
          this.closeModal(firstBarcode);
        });
      },
    );
    await BarcodeScanner.startScan(options);
    if (Capacitor.getPlatform() !== 'web') {
      void BarcodeScanner.getMinZoomRatio().then((result) => {
        this.minZoomRatio = result.zoomRatio;
      });
      void BarcodeScanner.getMaxZoomRatio().then((result) => {
        this.maxZoomRatio = result.zoomRatio;
      });
    }
  }

  private async stopScan(): Promise<void> {
    // Show everything behind the modal again
    document.querySelector('body')?.classList.remove('barcode-scanning-active');

    await BarcodeScanner.stopScan();
  }
}
