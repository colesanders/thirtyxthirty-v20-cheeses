import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { CheesesDetailComponent } from './cheeses-detail.component';

describe('CheesesDetailComponent', () => {
  let component: CheesesDetailComponent;
  let fixture: ComponentFixture<CheesesDetailComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheesesDetailComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheesesDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the formGroup', () => {
    component.createFormGroup();
    expect(component.cheeseForm).toBeTruthy();
  });

  it('should reset formGroup', () => {
    component.cancel();
    expect(component.cheeseForm.value).toMatchSnapshot();
  });


});
