import { Cheese } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedCheese = createAction('[Cheeses] Reset Selected Cheese');
export const resetCheeses = createAction('[Cheeses] Reset Cheeses');

// Select Cheese
export const selectCheese = createAction(
  '[Cheeses] Select Cheese',
  props<{ selectedId: string }>()
);

// Load Cheeses
export const loadCheeses = createAction('[Cheeses] Load Cheeses');

export const loadCheesesSuccess = createAction(
  '[Cheeses] Load Cheeses Success',
  props<{ cheeses: Cheese[] }>()
);

export const loadCheesesFailure = createAction(
  '[Cheeses] Load Cheeses Failure',
  props<{ error: any }>()
);

// Load Cheese
export const loadCheese = createAction(
  '[Cheeses] Load Cheese',
  props<{ cheeseId: string }>()
);

export const loadCheeseSuccess = createAction(
  '[Cheeses] Load Cheese Success',
  props<{ cheese: Cheese }>()
);

export const loadCheeseFailure = createAction(
  '[Cheeses] Load Cheese Failure',
  props<{ error: any }>()
);

// Create Cheese
export const createCheese = createAction(
  '[Cheeses] Create Cheese',
  props<{ cheese: Cheese }>()
);

export const createCheeseSuccess = createAction(
  '[Cheeses] Create Cheese Success',
  props<{ cheese: Cheese }>()
);

export const createCheeseFailure = createAction(
  '[Cheeses] Create Cheese Failure',
  props<{ error: any }>()
);

// Update Cheese
export const updateCheese = createAction(
  '[Cheeses] Update Cheese',
  props<{ cheese: Cheese }>()
);

export const updateCheeseSuccess = createAction(
  '[Cheeses] Update Cheese Success',
  props<{ cheese: Cheese }>()
);

export const updateCheeseFailure = createAction(
  '[Cheeses] Update Cheese Failure',
  props<{ error: any }>()
);

// Delete Cheese
export const deleteCheese = createAction(
  '[Cheeses] Delete Cheese',
  props<{ cheese: Cheese }>()
);

export const deleteCheeseCancelled = createAction(
  '[Cheeses] Delete Cheese Cancelled'
);

export const deleteCheeseSuccess = createAction(
  '[Cheeses] Delete Cheese Success',
  props<{ cheese: Cheese }>()
);

export const deleteCheeseFailure = createAction(
  '[Cheeses] Delete Cheese Failure',
  props<{ error: any }>()
);