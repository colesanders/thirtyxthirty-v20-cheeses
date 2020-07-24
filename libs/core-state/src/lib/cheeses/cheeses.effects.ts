import { Injectable } from '@angular/core';
import { CheesesService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as CheesesActions from './cheeses.actions';
import { Cheese } from '@thirty/api-interfaces';

@Injectable()
export class CheesesEffects {
  @Effect() loadCheeses$ = this.actions$.pipe(
    ofType(CheesesActions.loadCheeses),
    fetch({
      run: (action) => this.cheesesService.all().pipe(
        map((cheeses: Cheese[]) => CheesesActions.loadCheesesSuccess({ cheeses }))
      ),
      onError: (action, error) => CheesesActions.loadCheesesFailure({ error })
    })
  );

  @Effect() loadCheese$ = this.actions$.pipe(
    ofType(CheesesActions.loadCheese),
    fetch({
      run: (action) => this.cheesesService.byId(action.cheeseId).pipe(
        map((cheese: Cheese) => CheesesActions.loadCheeseSuccess({ cheese }))
      ),
      onError: (action, error) => CheesesActions.loadCheeseFailure({ error })
    })
  );

  @Effect() createCheese$ = this.actions$.pipe(
    ofType(CheesesActions.createCheese),
    pessimisticUpdate({
      run: (action) => this.cheesesService.create(action.cheese).pipe(
        map((cheese: Cheese) => CheesesActions.createCheeseSuccess({ cheese }))
      ),
      onError: (action, error) => CheesesActions.createCheeseFailure({ error })
    })
  );

  @Effect() updateCheese$ = this.actions$.pipe(
    ofType(CheesesActions.updateCheese),
    pessimisticUpdate({
      run: (action) => this.cheesesService.update(action.cheese).pipe(
        map((cheese: Cheese) => 
          CheesesActions.updateCheeseSuccess({ cheese }))
      ),
      onError: (action, error) => CheesesActions.updateCheeseFailure({ error })
    })
  );

  @Effect() deleteCheese$ = this.actions$.pipe(
    ofType(CheesesActions.deleteCheese),
    pessimisticUpdate({
      run: (action) => this.cheesesService.delete(action.cheese.id).pipe(
        map((cheese: Cheese) => CheesesActions.deleteCheeseSuccess({ cheese })),
      ),
      onError: (action, error) => CheesesActions.deleteCheeseFailure({ error })
    })
  );

  // Effect to refresh the cheese after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(CheesesActions.deleteCheeseSuccess, CheesesActions.updateCheeseSuccess),
  //   tap(action => {
  //     CheesesActions.loadCheeses();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private cheesesService: CheesesService
  ) {}
}