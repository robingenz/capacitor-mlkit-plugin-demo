import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { SubjectSegmentationPage } from './subject-segmentation.page';

describe('SubjectSegmentationPage', () => {
  let component: SubjectSegmentationPage;
  let fixture: ComponentFixture<SubjectSegmentationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectSegmentationPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectSegmentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
