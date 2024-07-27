import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'app-landing-page-mobile',
  standalone: true,
  imports: [],
  templateUrl: './landing-page-mobile.component.html',
  styleUrl: './landing-page-mobile.component.scss',
})
export class LandingPageMobileComponent implements AfterViewInit {
  @ViewChild('earthCanvas', { static: true })
  earthCanvas!: ElementRef<HTMLCanvasElement>;

  private earth: THREE.Object3D | undefined;
  private controls: OrbitControls | undefined;
  private isDragging = false;
  private directionalLight: THREE.DirectionalLight | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private dragTimeout: any;
  private isAnimating = false;

  ngAfterViewInit() {
    this.initThreeJS();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.camera && this.controls) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.controls.update();
    }
  }

  initThreeJS() {
    const canvas = this.earthCanvas.nativeElement;
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new GLTFLoader();
    loader.load('assets/earth.gltf', (gltf) => {
      this.earth = gltf.scene;
      scene.add(this.earth);
      this.earth.position.set(0, 0, 0);

      // Traverse and adjust materials if necessary
      this.earth.traverse((node: THREE.Object3D) => {
        if ((node as THREE.Mesh).isMesh) {
          const mesh = node as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          mesh.material = new THREE.MeshStandardMaterial({
            map: material.map,
            color: material.color,
          });
        }
      });

      // Initiate zoom animation after the earth model is loaded
      this.zoomCamera(this.camera!);
    });

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1).normalize();
    scene.add(this.directionalLight);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    // Allow full rotation on all axes
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minAzimuthAngle = -Infinity;
    this.controls.maxAzimuthAngle = Infinity;

    this.controls.addEventListener('start', () => {
      this.isDragging = true;
      clearTimeout(this.dragTimeout);
    });

    this.controls.addEventListener('end', () => {
      this.dragTimeout = setTimeout(() => {
        this.isDragging = false;
      }, 1000);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      if (this.earth && !this.isDragging) {
        this.earth.rotation.y += 0.002;
        this.earth.rotation.x += 0.001;
      }
      if (this.directionalLight) {
        this.directionalLight.position.copy(this.camera!.position);
      }
      if (!this.isAnimating) {
        this.controls?.update();
      }
      renderer.render(scene, this.camera!);
    };
    animate();
  }

  zoomCamera(camera: THREE.PerspectiveCamera) {
    this.isAnimating = true;
    this.controls!.enabled = false;

    const from = { z: 1000 };
    const to = { z: 3.7 };
    const duration = 1500;

    const tween = new TWEEN.Tween(from)
      .to(to, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.position.z = from.z;
      })
      .onComplete(() => {
        this.isAnimating = false;
        this.controls!.enabled = true;
      })
      .start();
  }
}
