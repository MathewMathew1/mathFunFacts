
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

type ButtonColor = 'black' | 'white' | 'red' | 'green' | 'blue' | 'default';

@Component({
  imports: [CommonModule],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() small: boolean = false;
  @Input() color: ButtonColor = 'default';
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Input() style: {[klass: string]: any} = {};

  // This computes the correct button size based on the "small" input
  get sizeClasses() {
    return this.small ? 'button-small' : 'button-large';
  }

  // This computes the correct color class based on the "color" input
  get colorClass() {
    return `button-${this.color}`;
  }
}

