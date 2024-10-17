import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isOverlayVisible: boolean = false;

  constructor(
    private responsiveService: ResponsiveService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.isOverlayVisible = false;
      }, 700);
    }
  }

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
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
