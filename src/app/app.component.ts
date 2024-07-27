import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LandingPageMobileComponent } from './consumers/components/mobile/landing-page-mobile/landing-page-mobile.component';
import { LandingPageDesktopComponent } from './consumers/components/desktop/landing-page-desktop/landing-page-desktop.component';
import { Observable } from 'rxjs';
import { ResponsiveService } from './shared/services/responsive.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AboutComponent } from "./consumers/components/about/about.component";
import { PropertyOwnerComponent } from "./consumers/components/property-owner/property-owner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    LandingPageMobileComponent,
    LandingPageDesktopComponent,
    AsyncPipe,
    AboutComponent,
    PropertyOwnerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile$: Observable<boolean>;

  constructor(private responsiveService: ResponsiveService) {
    this.isMobile$ = this.responsiveService.isMobile$;
  }
}
