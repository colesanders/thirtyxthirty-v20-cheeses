import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CheesesComponent } from './cheeses.component';
import { CheesesDetailComponent } from './components/cheeses-detail/cheeses-detail.component';
import { CheesesListComponent } from './components/cheeses-list/cheeses-list.component';
import { CheesesFacade } from '@thirty/core-state';
import { Cheese } from '@thirty/api-interfaces';

const mockCheesesFacade = {
  loadCheeses: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectCheese: (id:string) =>  {
    selectedCheese.id = id;
  }
}

const selectedCheese: Cheese = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockCheese: Cheese = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('CheesesComponent', () => {
  let component: CheesesComponent;
  let fixture: ComponentFixture<CheesesComponent>;
  let de: DebugElement;
  let cheeseFacade: CheesesFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CheesesFacade, useValue: mockCheesesFacade }
      ],
      declarations: [ 
        CheesesComponent,
        CheesesListComponent,
        CheesesDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheesesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    cheeseFacade = de.injector.get(CheesesFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockCheese);
    expect(selectedCheese).toMatchObject(mockCheese);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
