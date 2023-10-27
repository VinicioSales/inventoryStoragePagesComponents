import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() width: string = '293px';
  @Input() height: string = '30px';
  @Input() placeholder: string = 'input';
  @Output() valueChanged = new EventEmitter<string>();

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.valueChanged.emit(newValue);
  }

}
