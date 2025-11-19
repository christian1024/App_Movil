import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturaFinSiembraComponent } from './lectura-fin-siembra.component';

describe('LecturaFinSiembraComponent', () => {
  let component: LecturaFinSiembraComponent;
  let fixture: ComponentFixture<LecturaFinSiembraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaFinSiembraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaFinSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
