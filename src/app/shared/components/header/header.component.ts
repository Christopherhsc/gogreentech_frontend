import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openContactModal(): void {
    this.dialog.open(ContactModalComponent, {
      width: '600px', // Adjust the width here
      maxWidth: '90%', // Adjust the max-width to ensure responsiveness
      height: 'auto', // Adjust the height if needed
      data: {}
    });
  }
}
