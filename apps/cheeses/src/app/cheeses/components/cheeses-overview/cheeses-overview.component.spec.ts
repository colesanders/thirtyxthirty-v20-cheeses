import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CheesesOverviewComponent } from './cheeses-overview.component';
import { CheesesFacade, selectCheese } from '@thirty/core-state';

const mockCheesesFacade = {
  loadCheeses: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectCheese: (id:string) => {}
}

describe('CheesesOverviewComponent', () => {
  let component: CheesesOverviewComponent;
  let fixture: ComponentFixture<CheesesOverviewComponent>;
  let de: DebugElement;
  let cheeseFacade: CheesesFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheesesOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CheesesFacade, useValue: mockCheesesFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheesesOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    cheeseFacade = de.injector.get(CheesesFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(cheeseFacade.selectCheese).toBeCalled();
  // });

});
