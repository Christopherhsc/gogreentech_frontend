import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Add this import
import { ContactModalComponent } from '../../../shared/components/contact-modal/contact-modal.component';
import { InstallersData } from './installers-data';

@Component({
  selector: 'app-installers',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatDialogModule],
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

  constructor(public dialog: MatDialog) {}

  openContactModal(): void {
    this.dialog.open(ContactModalComponent, {
      width: '600px', // Adjust the width here
      maxWidth: '90%', // Adjust the max-width to ensure responsiveness
      height: 'auto', // Adjust the height if needed
      data: {}
    });
  }
}
