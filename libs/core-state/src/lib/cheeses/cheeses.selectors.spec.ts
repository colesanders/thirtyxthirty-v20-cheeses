import { CheesesEntity } from './cheeses.models';
import { State, cheesesAdapter, initialState } from './cheeses.reducer';
import * as CheesesSelectors from './cheeses.selectors';

describe('Cheeses Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCheesesId = (it) => it['id'];
  const createCheesesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CheesesEntity);

  let state;

  beforeEach(() => {
    state = {
      cheeses: cheesesAdapter.addAll(
        [
          createCheesesEntity('PRODUCT-AAA'),
          createCheesesEntity('PRODUCT-BBB'),
          createCheesesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Cheeses Selectors', () => {
    it('getAllCheeses() should return the list of Cheeses', () => {
      const results = CheesesSelectors.getAllCheeses(state);
      const selId = getCheesesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CheesesSelectors.getSelected(state);
      const selId = getCheesesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCheesesLoaded() should return the current 'loaded' status", () => {
      const result = CheesesSelectors.getCheesesLoaded(state);

      expect(result).toBe(true);
    });

    it("getCheesesError() should return the current 'error' state", () => {
      const result = CheesesSelectors.getCheesesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
