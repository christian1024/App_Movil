import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturaCalidadSiembraComponent } from './lectura-calidad-siembra.component';

describe('LecturaCalidadSiembraComponent', () => {
  let component: LecturaCalidadSiembraComponent;
  let fixture: ComponentFixture<LecturaCalidadSiembraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaCalidadSiembraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaCalidadSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
