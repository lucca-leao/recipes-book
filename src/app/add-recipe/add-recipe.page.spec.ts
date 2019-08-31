import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipePage } from './add-recipe.page';

describe('AddRecipePage', () => {
  let component: AddRecipePage;
  let fixture: ComponentFixture<AddRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
