import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrReaderComponent } from './qr-reader.component';

describe('QrReaderComponent', () => {
  let component: QrReaderComponent;
  let fixture: ComponentFixture<QrReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrReaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
