import { Component, NgZone, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  DocumentScanner,
  ScanOptions,
  ScanResult,
  GoogleDocumentScannerModuleInstallState,
  GoogleDocumentScannerModuleInstallProgressEvent,
} from '@capacitor-mlkit/document-scanner';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-document-scanner',
  templateUrl: './document-scanner.page.html',
  styleUrls: ['./document-scanner.page.scss'],
})
export class DocumentScannerPage implements OnInit {
  public readonly scannerMode = {
    FULL: 'FULL',
    BASE: 'BASE',
    BASE_WITH_FILTER: 'BASE_WITH_FILTER',
  };

  public readonly resultFormats = {
    JPEG: 'JPEG',
    PDF: 'PDF',
    JPEG_PDF: 'JPEG_PDF',
  };

  public readonly installState = GoogleDocumentScannerModuleInstallState;

  public formGroup = new UntypedFormGroup({
    galleryImportAllowed: new UntypedFormControl(false),
    pageLimit: new UntypedFormControl(10),
    resultFormats: new UntypedFormControl('JPEG_PDF'),
    scannerMode: new UntypedFormControl('FULL'),
    googleDocumentScannerModuleInstallState: new UntypedFormControl(0),
    googleDocumentScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  public scanResult: ScanResult | null = null;
  public isModuleAvailable = false;

  private readonly GH_URL =
    'https://github.com/capawesome-team/capacitor-mlkit';

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly ngZone: NgZone,
  ) {}

  public ngOnInit(): void {
    this.checkModuleAvailability();
    this.setupEventListener();
  }

  public async scanDocument(): Promise<void> {
    const options: ScanOptions = {
      galleryImportAllowed:
        this.formGroup.get('galleryImportAllowed')?.value || false,
      pageLimit: this.formGroup.get('pageLimit')?.value || 10,
      resultFormats: this.formGroup.get('resultFormats')?.value || 'JPEG_PDF',
      scannerMode: this.formGroup.get('scannerMode')?.value || 'FULL',
    };

    try {
      const result = await DocumentScanner.scanDocument(options);
      this.scanResult = result;
    } catch (error) {
      console.error('Error scanning document:', error);
    }
  }

  public async checkModuleAvailability(): Promise<void> {
    try {
      const result =
        await DocumentScanner.isGoogleDocumentScannerModuleAvailable();
      this.isModuleAvailable = result.available;
    } catch (error) {
      console.error('Error checking module availability:', error);
      this.isModuleAvailable = false;
    }
  }

  public async installGoogleDocumentScannerModule(): Promise<void> {
    try {
      await DocumentScanner.installGoogleDocumentScannerModule();
    } catch (error) {
      console.error('Error installing module:', error);
    }
  }

  public openOnGithub(): void {
    window.open(this.GH_URL, '_blank');
  }

  public convertPathToWebPath(path: string): SafeUrl {
    const fileSrc = Capacitor.convertFileSrc(path);
    return this.domSanitizer.bypassSecurityTrustUrl(fileSrc);
  }

  private setupEventListener(): void {
    DocumentScanner.removeAllListeners().then(() => {
      DocumentScanner.addListener(
        'googleDocumentScannerModuleInstallProgress',
        (event: GoogleDocumentScannerModuleInstallProgressEvent) => {
          this.ngZone.run(() => {
            console.log('googleDocumentScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleDocumentScannerModuleInstallState: state,
              googleDocumentScannerModuleInstallProgress: progress,
            });
          });
        },
      );
    });
  }
}
