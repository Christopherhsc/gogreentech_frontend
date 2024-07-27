import { Component } from '@angular/core';
import { propertyOwnerData } from './property-owner-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-owner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-owner.component.html',
  styleUrls: ['./property-owner.component.scss'],
})
export class PropertyOwnerComponent {
  data = propertyOwnerData;
}
