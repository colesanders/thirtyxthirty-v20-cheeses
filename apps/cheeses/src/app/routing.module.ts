import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CheesesComponent } from './cheeses/cheeses.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { CheesesOverviewComponent } from './cheeses/components/cheeses-overview/cheeses-overview.component';

import { LoginGuard } from '@thirty/ui-login';

const routes: Routes = [
  { path: 'cheeses', component: CheesesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: CheesesOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/cheeses', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
