import { Component } from '@angular/core';
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
export class InstallersComponent {
  mainText = InstallersData.mainText;
  installerText = InstallersData.installerText;
  ownerText = InstallersData.ownerText;

  isMobile: boolean = false;

  sections = [
    { title: 'Som installatør:', content: this.installerText },
    { title: 'Som ejendomsejer:', content: this.ownerText },
  ];

  constructor(
    public dialog: MatDialog,
    private responsiveService: ResponsiveService,
  ) {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
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
