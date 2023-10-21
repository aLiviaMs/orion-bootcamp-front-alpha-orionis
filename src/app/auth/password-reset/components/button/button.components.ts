import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Basic buttons
 */
@Component({
  selector: 'app-button',
  templateUrl: 'button.components.html',
  styleUrls: ['button.components.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})

export class ButtonComponent {
  // rever constructor
  constructor(private location: Location) {
    this.btnName = '';
  }
  //@Output() btnClick = new EventEmitter();
  @Input() btnName: string;
}
