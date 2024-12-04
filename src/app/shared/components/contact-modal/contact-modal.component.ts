import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [CommonModule, MatIconModule],
  standalone: true,
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        }),
      ),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('600ms ease-in-out'),
      ]),
      transition(':leave', [
        animate('600ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class ContactModalComponent implements OnInit {
  isMobile!: boolean;

  constructor(public dialogRef: MatDialogRef<ContactModalComponent>) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
