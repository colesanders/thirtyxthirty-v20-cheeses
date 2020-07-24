import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CheesesFacade } from '@thirty/core-state'
import { Cheese } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';
import { Animations } from './animations';


@Component({
  selector: 'thirty-cheeses',
  templateUrl: './cheeses.component.html',
  styleUrls: ['./cheeses.component.scss'],
  animations: Animations,
})
export class CheesesComponent implements OnInit {
  cheeses$: Observable<Cheese[]> = this.cheeseFacade.allCheeses$;
  cheese$: Observable<Cheese> = this.cheeseFacade.selectedCheese$;
  detailOpen = false;

  constructor(
    private cheeseFacade: CheesesFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.cheeseFacade.loadCheeses();
    this.cheeseFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Cheese ' + trigger[1] + 'd';
    this.focusoutDetail();
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.cheeseFacade.resetSelectedCheese();
    this.cheeseFacade.loadCheeses();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(cheese: Cheese): void{
    this.cheeseFacade.selectCheese(cheese.id);
    this.focusDetail();
  }

  delete(cheese: Cheese): void{
    this.cheeseFacade.deleteCheese(cheese);
  }

  save(cheese: Cheese): void{
    if(cheese.id !== null){
      this.cheeseFacade.updateCheese(cheese);
    }else {
      this.cheeseFacade.createCheese(cheese);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/cheeses']);
    this.cheeseFacade.resetSelectedCheese();
  }

}
