import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { landingPageData } from './landing-page-mobile-data';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactModalComponent } from '../../../shared/components/contact-modal/contact-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page-mobile',
  standalone: true,
  imports: [CommonModule], // Make sure CommonModule is here
  templateUrl: './landing-page-mobile.component.html',
  styleUrls: ['./landing-page-mobile.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))]),
    ]),
  ],
})

export class LandingPageMobileComponent implements OnInit, OnDestroy {
  images = landingPageData.images; 
  currentSlide = 0;
  showSlide = true;
  timer: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.resetTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 9000);
  }

  nextSlide() {
    this.showSlide = false;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length; // Use images length
      this.showSlide = true;
      this.resetTimer();
    }, 1000); // Match the duration of the fade-out animation
  }

  previousSlide() {
    this.showSlide = false;
    setTimeout(() => {
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length; // Use images length
      this.showSlide = true;
      this.resetTimer();
    }, 1000); // Match the duration of the fade-out animation
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
