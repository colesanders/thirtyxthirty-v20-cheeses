import { Cheese } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CheesesActions from './cheeses.actions';

export const CHEESES_FEATURE_KEY = 'cheese';

export interface CheesesState extends EntityState<Cheese> {
  selectedId?: string | number; // which Cheeses record has been selected
  loaded: boolean; // has the Cheeses list been loaded
  error?: string | null; // last known error (if any)
}

export interface CheesesPartialState {
  readonly [CHEESES_FEATURE_KEY]: CheesesState;
}

export const cheeseAdapter: EntityAdapter<Cheese> = createEntityAdapter();

export const initialCheesesState: CheesesState = cheeseAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _cheesesReducer = createReducer(
  initialCheesesState,
  on(CheesesActions.resetCheeses, state => cheeseAdapter.removeAll(state)),
  on(CheesesActions.resetSelectedCheese, state => Object.assign({}, state, { selectedId: null })),
  on(CheesesActions.selectCheese, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load cheeses
  on(
    CheesesActions.loadCheesesSuccess,
    (state, { cheeses }) =>
    cheeseAdapter.setAll(cheeses, { ...state, loaded: true })
  ),
  // Load cheese
  on(
    CheesesActions.loadCheeseSuccess,
    (state, { cheese }) =>
    cheeseAdapter.upsertOne(cheese, { ...state, loaded: true })
  ),
  // Add cheese
  on(CheesesActions.createCheeseSuccess,
    (state, { cheese }) =>
    cheeseAdapter.addOne(cheese, state)
  ),
  // Update cheese
  on(CheesesActions.updateCheeseSuccess,
    (state, { cheese }) =>
    cheeseAdapter.updateOne({ id: cheese.id, changes: cheese }, state)
  ),
  // Delete cheese
  on(CheesesActions.deleteCheeseSuccess,
    (state, { cheese }) =>
    cheeseAdapter.removeOne(cheese.id, state)
  ),

  // failure actions
  on(
    CheesesActions.deleteCheeseFailure,
    CheesesActions.updateCheeseFailure,
    CheesesActions.createCheeseFailure,
    CheesesActions.loadCheeseFailure,
    CheesesActions.loadCheesesFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    CheesesActions.loadCheese,
    CheesesActions.loadCheeses,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function cheesesReducer(state: CheesesState | undefined, action: Action) {
  return _cheesesReducer(state, action);
}