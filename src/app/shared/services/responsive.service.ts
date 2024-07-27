import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private mobileWidth = 1023;
  private isMobileSubject = new BehaviorSubject<boolean>(this.isMobile(window.innerWidth));
  public isMobile$ = this.isMobileSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.checkWidth();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private isMobile(width: number): boolean {
    return width < this.mobileWidth;
  }

  private onResize(event: Event): void {
    this.ngZone.run(() => {
      this.isMobileSubject.next(this.isMobile(window.innerWidth));
    });
  }

  private checkWidth(): void {
    this.isMobileSubject.next(this.isMobile(window.innerWidth));
  }
}
