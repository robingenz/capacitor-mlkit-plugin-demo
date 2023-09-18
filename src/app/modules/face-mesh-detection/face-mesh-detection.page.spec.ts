import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { FaceMeshDetectionPage } from './face-mesh-detection.page';

describe('FaceMeshDetectionPage', () => {
  let component: FaceMeshDetectionPage;
  let fixture: ComponentFixture<FaceMeshDetectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FaceMeshDetectionPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FaceMeshDetectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
