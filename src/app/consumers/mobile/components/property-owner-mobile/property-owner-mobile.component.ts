import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { propertyOwnerData } from './propert-owner-mobile-data';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-property-owner-mobile',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './property-owner-mobile.component.html',
  styleUrls: ['./property-owner-mobile.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: '0',
          padding: '0 16px',
        }),
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: '1',
          padding: '16px',
        }),
      ),
      transition('collapsed <=> expanded', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class PropertyOwnerMobileComponent {
  showText = false;
  data = propertyOwnerData;

  toggleText() {
    this.showText = !this.showText;
  }
}
