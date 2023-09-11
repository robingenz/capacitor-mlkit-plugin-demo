import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { SelfieSegmentationPage } from './selfie-segmentation.page';

describe('SelfieSegmentationPage', () => {
  let component: SelfieSegmentationPage;
  let fixture: ComponentFixture<SelfieSegmentationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelfieSegmentationPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfieSegmentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
