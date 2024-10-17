import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'app-landing-page-desktop',
  standalone: true,
  imports: [],
  templateUrl: './landing-page-desktop.component.html',
  styleUrls: ['./landing-page-desktop.component.scss'],
})
export class LandingPageDesktopComponent {

}
