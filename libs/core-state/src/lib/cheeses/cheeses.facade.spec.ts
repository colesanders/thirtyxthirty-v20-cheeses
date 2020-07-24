import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CheesesEntity } from './cheeses.models';
import { CheesesEffects } from './cheeses.effects';
import { CheesesFacade } from './cheeses.facade';

import * as CheesesSelectors from './cheeses.selectors';
import * as CheesesActions from './cheeses.actions';
import {
  CHEESES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './cheeses.reducer';

interface TestSchema {
  cheeses: State;
}

describe('CheesesFacade', () => {
  let facade: CheesesFacade;
  let store: Store<TestSchema>;
  const createCheesesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CheesesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CHEESES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CheesesEffects]),
        ],
        providers: [CheesesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CheesesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCheeses$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CheesesActions.loadCheeses());

        list = await readFirst(facade.allCheeses$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCheesesSuccess` to manually update list
     */
    it('allCheeses$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCheeses$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CheesesActions.loadCheesesSuccess({
            cheeses: [createCheesesEntity('AAA'), createCheesesEntity('BBB')],
          })
        );

        list = await readFirst(facade.allCheeses$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
