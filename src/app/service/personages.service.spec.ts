import { TestBed } from '@angular/core/testing';

import { PersonagesService } from './personages.service';

describe('PersonagesService', () => {
  let service: PersonagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
