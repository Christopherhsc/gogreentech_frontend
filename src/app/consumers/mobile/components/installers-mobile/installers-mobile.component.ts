import { Component } from '@angular/core';
import { InstallersData } from '../../../desktop/components/installers/installers-data';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ContactModalComponent } from '../../../../shared/components/contact-modal/contact-modal.component';

@Component({
  selector: 'app-installers-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installers-mobile.component.html',
  styleUrls: ['./installers-mobile.component.scss'],
})
export class InstallersMobileComponent {
  mainText = InstallersData.mainText;
  installerText = InstallersData.installerText;
  ownerText = InstallersData.ownerText;
  solutionsText = InstallersData.solutionsText;

  showMore = false;

  constructor(public dialog: MatDialog) {}

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  openContactModal(): void {
    this.dialog.open(ContactModalComponent, {
      panelClass: 'contact-modal-sidebar',
      width: '600px',
      maxWidth: '100%',
      height: '100%',
      position: { left: '0', top: '0' },
      data: {},
    });
  }
}
