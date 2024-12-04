import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

// Import your components
import { LandingPageDesktopComponent } from './consumers/desktop/landing-page-desktop/landing-page-desktop.component';
import { PropertyOwnerComponent } from './consumers/desktop/components/property-owner/property-owner.component';
import { InstallersComponent } from './consumers/desktop/components/installers/installers.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    LandingPageDesktopComponent,
    PropertyOwnerComponent,
    InstallersComponent,
    FooterComponent,

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

constructor(){}
}
