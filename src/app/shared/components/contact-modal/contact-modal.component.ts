import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent {
  constructor(public dialogRef: MatDialogRef<ContactModalComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}