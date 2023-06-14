import { TestBed } from '@angular/core/testing';

import { IngredientCrudService } from './ingredient-crud.service';

describe('IngredientCrudService', () => {
  let service: IngredientCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
