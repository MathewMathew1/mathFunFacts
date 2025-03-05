import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './fact-favorites.service';

describe('FactFavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
