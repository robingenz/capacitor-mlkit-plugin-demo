import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { MlkitTranslationPage } from './mlkit-translation.page';

describe('MlkitTranslationPage', () => {
  let component: MlkitTranslationPage;
  let fixture: ComponentFixture<MlkitTranslationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MlkitTranslationPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MlkitTranslationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
