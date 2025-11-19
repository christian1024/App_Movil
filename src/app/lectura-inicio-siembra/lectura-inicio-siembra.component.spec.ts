import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturaInicioSiembraComponent } from './lectura-inicio-siembra.component';

describe('LecturaInicioSiembraComponent', () => {
  let component: LecturaInicioSiembraComponent;
  let fixture: ComponentFixture<LecturaInicioSiembraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaInicioSiembraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaInicioSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
