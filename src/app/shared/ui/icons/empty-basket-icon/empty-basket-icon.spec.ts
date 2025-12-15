import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBasketIcon } from './empty-basket-icon';

describe('EmptyBasketIcon', () => {
  let component: EmptyBasketIcon;
  let fixture: ComponentFixture<EmptyBasketIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyBasketIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyBasketIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
