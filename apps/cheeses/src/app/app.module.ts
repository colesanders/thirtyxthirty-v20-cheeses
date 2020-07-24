import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule, RatingComponent, MatChipComponent } from '@thirty/material';
import * as fromCheeses from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { CheesesComponent } from './cheeses/cheeses.component';
import { CheesesOverviewComponent } from './cheeses/components/cheeses-overview/cheeses-overview.component';
import { CheesesDetailComponent } from './cheeses/components/cheeses-detail/cheeses-detail.component';
import { CheesesListComponent } from './cheeses/components/cheeses-list/cheeses-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    CheesesComponent,
    CheesesOverviewComponent,
    CheesesDetailComponent,
    CheesesListComponent,
    FourOhFourComponent,
    CheesesComponent,
    RatingComponent,
    MatChipComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromCheeses.cheesesReducer, {}),
    EffectsModule.forRoot([fromCheeses.CheesesEffects]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


