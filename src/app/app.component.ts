import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageMobileComponent } from './consumers/mobile/landing-page-mobile/landing-page-mobile.component';
import { LandingPageDesktopComponent } from './consumers/desktop/landing-page-desktop/landing-page-desktop.component';
import { Observable } from 'rxjs';
import { ResponsiveService } from './shared/services/responsive.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PropertyOwnerComponent } from './consumers/desktop/components/property-owner/property-owner.component';
import { InstallersComponent } from './consumers/desktop/components/installers/installers.component';

//shared components
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

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
    PropertyOwnerComponent,
    InstallersComponent,
    FooterComponent,
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
