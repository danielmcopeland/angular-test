import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaizziComponent } from './colaizzi.component';

describe('ColaizziComponent', () => {
  let component: ColaizziComponent;
  let fixture: ComponentFixture<ColaizziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaizziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaizziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
