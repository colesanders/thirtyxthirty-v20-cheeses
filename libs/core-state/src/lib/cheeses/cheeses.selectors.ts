import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CHEESES_FEATURE_KEY,
  CheesesState,
  CheesesPartialState,
  cheeseAdapter
} from './cheeses.reducer';

// Lookup the 'Cheeses' feature state managed by NgRx
export const getCheesesState = createFeatureSelector<
  CheesesPartialState,
  CheesesState
>(CHEESES_FEATURE_KEY);

const { selectAll, selectEntities } = cheeseAdapter.getSelectors();

export const getCheesesLoaded = createSelector(
  getCheesesState,
  (state: CheesesState) => state.loaded
);

export const getCheesesError = createSelector(
  getCheesesState,
  (state: CheesesState) => state.error
);

export const getAllCheeses = createSelector(
  getCheesesState,
  (state: CheesesState) => selectAll(state)
);

export const getCheesesEntities = createSelector(
  getCheesesState,
  (state: CheesesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCheesesState,
  (state: CheesesState) => state.selectedId
);

export const getSelectedCheese = createSelector(
  getCheesesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);