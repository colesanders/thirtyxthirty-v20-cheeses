import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cheese } from '@thirty/api-interfaces';
import { CheesesFacade } from '@thirty/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'thirty-cheeses-overview',
  templateUrl: './cheeses-overview.component.html',
  styleUrls: ['./cheeses-overview.component.scss']
})
export class CheesesOverviewComponent implements OnInit, OnChanges {
  cheese$: Observable<Cheese> = this.cheeseFacade.selectedCheese$;


  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private cheeseFacade: CheesesFacade
  ) { }

  ngOnInit(): void {
    this.get();
    this.cheeseFacade.mutations$.subscribe((action: any) => this.get());

  }

  ngOnChanges(): void{
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cheeseFacade.selectCheese(id);
  }

  close(){
    this.cheeseFacade.resetSelectedCheese();
    this.router.navigate(['/cheeses']);
  }
}
