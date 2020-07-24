import { CheesesEntity } from './cheeses.models';
import * as CheesesActions from './cheeses.actions';
import { State, initialState, reducer } from './cheeses.reducer';

describe('Cheeses Reducer', () => {
  const createCheesesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CheesesEntity);

  beforeEach(() => {});

  describe('valid Cheeses actions', () => {
    it('loadCheesesSuccess should return set the list of known Cheeses', () => {
      const cheeses = [
        createCheesesEntity('PRODUCT-AAA'),
        createCheesesEntity('PRODUCT-zzz'),
      ];
      const action = CheesesActions.loadCheesesSuccess({ cheeses });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
