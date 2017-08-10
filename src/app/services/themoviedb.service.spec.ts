import { TestBed, inject } from '@angular/core/testing';

import { ThemoviedbService } from './themoviedb.service';

describe('ThemoviedbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemoviedbService]
    });
  });

  it('should be created', inject([ThemoviedbService], (service: ThemoviedbService) => {
    expect(service).toBeTruthy();
  }));
});
