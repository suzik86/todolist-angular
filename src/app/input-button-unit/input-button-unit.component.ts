import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent {
  todoForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: [new Date()],
  });

  @Output() submitForm: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) { }


  onSubmit() {
    this.submitForm.emit(this.todoForm.value);
    this.todoForm.patchValue({
      title: '',
      dueDate: new Date(),
    });
  }

}

