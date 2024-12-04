import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isOverlayVisible: boolean = false;
  showButtons: boolean = false;
  showNav1: boolean = false;
  showNav2: boolean = false;
  showNav3: boolean = false;

  constructor(public dialog: MatDialog, private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    setTimeout(() => {
      this.showButtons = true;
    }, 200);

    setTimeout(() => {
      this.showNav1 = true;
    }, 200);

    setTimeout(() => {
      this.showNav2 = true;
    }, 1200);

    setTimeout(() => {
      this.showNav3 = true;
    }, 2200);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isOverlayVisible = false; // Close overlay after navigation
    }
  }

  toggleOverlay(): void {
    this.isOverlayVisible = !this.isOverlayVisible; // Toggle overlay visibility
  }

  openContactModal(): void {
    const dialogConfig = this.isMobile
      ? {
          panelClass: 'contact-modal-sidebar',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          position: { left: '0', top: '0' },
          data: {},
        }
      : {
          panelClass: 'contact-modal-sidebar',
          minWidth: '550px',
          maxWidth: '50%',
          width: '50%',
          height: '100%',
          position: { left: '0', top: '0' },
          data: {},
        };

    this.dialog.open(ContactModalComponent, dialogConfig);
    this.isOverlayVisible = false;
  }
}
