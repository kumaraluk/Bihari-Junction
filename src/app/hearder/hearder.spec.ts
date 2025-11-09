import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hearder } from './hearder';

describe('Hearder', () => {
  let component: Hearder;
  let fixture: ComponentFixture<Hearder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hearder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hearder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
