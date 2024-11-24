import { Component } from '@angular/core';
import { landingpagedata } from './landing-page-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page-desktop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page-desktop.component.html',
  styleUrls: ['./landing-page-desktop.component.scss'],
})
export class LandingPageDesktopComponent {
  data = landingpagedata;
}
