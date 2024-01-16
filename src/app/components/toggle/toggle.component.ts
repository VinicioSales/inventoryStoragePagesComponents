import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  toggleOn: boolean = false;
  classToggleOff: string = 'container-toggle';
  classToggleOn: string = 'container-toggle-on';

  @Output() toggleStatus = new EventEmitter<boolean>();

  @Input() onToggleChange: ((status: boolean) => void) | undefined;

  
  //NOTE - onClick
  onClick() {
    this.toggleOn = !this.toggleOn;
    // this.toggleStatus.emit();
    if (this.onToggleChange) {
      this.onToggleChange(this.toggleOn);
    }
  }
}
