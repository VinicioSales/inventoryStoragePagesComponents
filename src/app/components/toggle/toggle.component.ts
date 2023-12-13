import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  toggleOn: boolean = false;
  classToggleOff: string = 'container-toggle';
  classToggleOn: string = 'container-toggle-on';
  
  //NOTE - onClick
  onClick() {
    this.toggleOn = !this.toggleOn;
  }
}
