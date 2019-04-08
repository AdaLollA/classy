import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongueComponent } from './tongue.component';

describe('TongueComponent', () => {
  let component: TongueComponent;
  let fixture: ComponentFixture<TongueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongueComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
