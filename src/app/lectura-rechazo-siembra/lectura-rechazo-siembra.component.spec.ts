import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturaRechazoSiembraComponent } from './lectura-rechazo-siembra.component';

describe('LecturaRechazoSiembraComponent', () => {
  let component: LecturaRechazoSiembraComponent;
  let fixture: ComponentFixture<LecturaRechazoSiembraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturaRechazoSiembraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturaRechazoSiembraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
