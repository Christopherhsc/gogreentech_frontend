import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../../services/responsive.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
