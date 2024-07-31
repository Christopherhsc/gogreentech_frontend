import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in-out')
      ]),
      transition(':leave', [
        animate('600ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ContactModalComponent {
  constructor(public dialogRef: MatDialogRef<ContactModalComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
