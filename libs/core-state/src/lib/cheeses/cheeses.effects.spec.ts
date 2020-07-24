import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CheesesEffects } from './cheeses.effects';
import * as CheesesActions from './cheeses.actions';

describe('CheesesEffects', () => {
  let actions: Observable<any>;
  let effects: CheesesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CheesesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CheesesEffects);
  });

  describe('loadCheeses$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CheesesActions.loadCheeses() });

      const expected = hot('-a-|', {
        a: CheesesActions.loadCheesesSuccess({ cheeses: [] }),
      });

      expect(effects.loadCheeses$).toBeObservable(expected);
    });
  });
});
