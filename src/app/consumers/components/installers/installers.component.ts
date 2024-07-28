import { Component } from '@angular/core';
import { InstallersData } from './installers-data';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-installers',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './installers.component.html',
  styleUrls: ['./installers.component.scss']
})
export class InstallersComponent {
  mainText = InstallersData.mainText;
  installerText = InstallersData.installerText;
  ownerText = InstallersData.ownerText;
  solutionsText = InstallersData.solutionsText;

  sections = [
    { title: 'Som installatør:', content: this.installerText },
    { title: 'Som ejendomsejer:', content: this.ownerText }
  ];
}
