import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { TranslationPage } from './translation.page';

describe('TranslationPage', () => {
  let component: TranslationPage;
  let fixture: ComponentFixture<TranslationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationPage],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
