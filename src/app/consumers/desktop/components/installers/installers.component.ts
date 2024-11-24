import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactModalComponent } from '../../../../shared/components/contact-modal/contact-modal.component';
import { InstallersData } from './installers-data';
import { ResponsiveService } from '../../../../shared/services/responsive.service';

@Component({
  selector: 'app-installers',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatDialogModule],
  templateUrl: './installers.component.html',
  styleUrls: ['./installers.component.scss'],
})
export class InstallersComponent implements AfterViewInit {
  mainText = InstallersData.mainText;
  installerText = InstallersData.installerText;
  ownerText = InstallersData.ownerText;
  images = InstallersData.images;

  isMobile: boolean = false;

  sections = [
    { title: 'Som installatør:', content: this.installerText },
    { title: 'Som ejendomsejer:', content: this.ownerText },
  ];

  constructor(
    public dialog: MatDialog,
    private responsiveService: ResponsiveService
  ) {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const imageElements = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      imageElements.forEach((element) => observer.observe(element));
    }, 1500);
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
  }
}
