import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactModalComponent } from '../../../shared/components/contact-modal/contact-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing-page-mobile',
  standalone: true,
  imports: [CommonModule],
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
  slides = [
    {
      image: '/assets/gogreentech_logo.png',
      text: 'Energiforbindelser og Lejeaftaler',
      subText:
        'Gogreentech forbinder ejendomsejere med Energinet og tilbyder lejeaftaler for overskydende ampere, samt honorarer til elinstallatører for henvisninger.',
    },
    {
      image: 'assets/industry.jpg',
      text: 'Innovative Energiløsninger',
      subText:
        'Med stigende elforbrug og udfasning af fossile brændstoffer, tilbyder Gogreentech innovative løsninger til at stabilisere elnettet gennem udlejning af overskydende energiressourcer.',
    },
    {
      image: 'assets/installers.png',
      text: 'Optimal Energiudnyttelse',
      subText:
        'Ved at leje overskydende ampere til Gogreentech, bidrager virksomheder til en stabil og bæredygtig energiforsyning, samtidig med at de udnytter deres ressourcer optimalt.',
    },
  ];

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
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.showSlide = true;
      this.resetTimer();
    }, 1000); // Match the duration of the fade-out animation
  }

  previousSlide() {
    this.showSlide = false;
    setTimeout(() => {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
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
