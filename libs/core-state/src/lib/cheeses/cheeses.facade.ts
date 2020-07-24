import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Cheese } from '@thirty/api-interfaces';

import * as CheesesActions from './cheeses.actions';
import * as fromCheeses from './cheeses.reducer';
import * as CheesesSelectors from './cheeses.selectors';

@Injectable({
  providedIn: 'root'
})
export class CheesesFacade {
  loaded$ = this.store.pipe(select(CheesesSelectors.getCheesesLoaded));
  allCheeses$ = this.store.pipe(select(CheesesSelectors.getAllCheeses));
  selectedCheese$ = this.store.pipe(select(CheesesSelectors.getSelectedCheese));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === CheesesActions.createCheese({} as any).type ||
    action.type === CheesesActions.updateCheese({} as any).type ||
    action.type === CheesesActions.deleteCheese({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectCheese(selectedId: string) {
    this.dispatch(CheesesActions.selectCheese({ selectedId }));
  }

  resetSelectedCheese(){
    this.dispatch(CheesesActions.resetSelectedCheese());
  }

  loadCheeses() {
    this.dispatch(CheesesActions.loadCheeses());
  }

  loadCheese(cheeseId: string) {
    this.dispatch(CheesesActions.loadCheese({ cheeseId }));
  }

  createCheese(cheese: Cheese) {
    this.dispatch(CheesesActions.createCheese({ cheese }));
  }

  updateCheese(cheese: Cheese) {
    this.dispatch(CheesesActions.updateCheese({ cheese }));
  }

  deleteCheese(cheese: Cheese) {
    this.dispatch(CheesesActions.deleteCheese({ cheese }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
