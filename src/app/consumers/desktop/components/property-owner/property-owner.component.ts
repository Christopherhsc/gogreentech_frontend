import { Component } from '@angular/core';
import { propertyOwnerData } from './property-owner-data';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-property-owner',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './property-owner.component.html',
  styleUrl: './property-owner.component.scss',
})
export class PropertyOwnerComponent {
  data = propertyOwnerData;
}
