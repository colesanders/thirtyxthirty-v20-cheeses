import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Cheese } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-cheeses-detail',
  templateUrl: './cheeses-detail.component.html',
  styleUrls: ['./cheeses-detail.component.scss']
})
export class CheesesDetailComponent implements OnInit, OnChanges{
  @Input() cheese: Cheese;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  cheeseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.cheeseForm && this.cheese){
      this.cheeseForm.patchValue(this.cheese)
    } else if(this.cheeseForm){
      this.cancel();
    }
  }

  cancel(){
    this.cheeseForm.reset();
  }

  createFormGroup(){
    this.cheeseForm = this.formBuilder.group({
      id: [],
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      rating: new FormControl(1, [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.required,
      ])
    })
  }
}
