import { Component, Input, Output, EventEmitter, HostBinding  } from '@angular/core';

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
  @Input() isInvalid: boolean = false;
  @Input() campoVaido: boolean = true;
  classe: string = 'componente-input'
   
  handleValidade(event:any){
    if(this.campoVaido){
      this.classe = 'input-invalido';
    }
  }

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.valueChanged.emit(newValue);
  }

}
