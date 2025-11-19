import { TestBed } from '@angular/core/testing';

import { ConexionhttpService } from './conexionhttp.service';

describe('ConexionhttpService', () => {
  let service: ConexionhttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionhttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
