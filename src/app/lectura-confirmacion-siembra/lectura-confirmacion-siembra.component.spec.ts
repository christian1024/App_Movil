import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturaConfirmacionSiembraComponent } from './lectura-confirmacion-siembra.component';

describe('LecturaConfirmacionSiembraComponent', () => {
  let component: LecturaConfirmacionSiembraComponent;
  let fixture: ComponentFixture<LecturaConfirmacionSiembraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaConfirmacionSiembraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaConfirmacionSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
