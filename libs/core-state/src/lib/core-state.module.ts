import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCheeses from './cheeses/cheeses.reducer';
import { CheesesEffects } from './cheeses/cheeses.effects';
import { CheesesFacade } from './cheeses/cheeses.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCheeses.CHEESES_FEATURE_KEY,
      fromCheeses.cheesesReducer
    ),
    EffectsModule.forFeature([CheesesEffects]),
  ],
  providers: [CheesesFacade],
})
export class CoreStateModule {}
