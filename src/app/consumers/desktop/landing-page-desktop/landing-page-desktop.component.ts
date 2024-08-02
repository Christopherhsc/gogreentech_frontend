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
export class LandingPageDesktopComponent implements AfterViewInit {
  @ViewChild('earthCanvas', { static: true })
  earthCanvas!: ElementRef<HTMLCanvasElement>;

  private earth: THREE.Object3D | undefined;
  private controls: OrbitControls | undefined;
  private isManualRotating = false;
  private directionalLight: THREE.DirectionalLight | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private dragTimeout: any;
  private isAnimating = false;

  ngAfterViewInit() {
    this.initThreeJS();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeRendererToDisplaySize();
  }

  initThreeJS() {
    const canvas = this.earthCanvas.nativeElement;
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.resizeRendererToDisplaySize();

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
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

    // Allow full rotation on all axes
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minAzimuthAngle = -Infinity;
    this.controls.maxAzimuthAngle = Infinity;

    this.controls.addEventListener('start', () => {
      this.isManualRotating = true;
      clearTimeout(this.dragTimeout);
      this.fadeOutElements();
    });

    this.controls.addEventListener('end', () => {
      this.dragTimeout = setTimeout(() => {
        this.isManualRotating = false;
        this.fadeInElements();
      }, 1000);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      if (this.earth && !this.isManualRotating) {
        this.earth.rotation.y += 0.004;
        this.earth.rotation.x += 0.002;
      }
      if (this.directionalLight) {
        this.directionalLight.position.copy(this.camera!.position);
      }
      if (!this.isAnimating) {
        this.controls?.update();
      }
      this.resizeRendererToDisplaySize();
      this.renderer!.render(scene, this.camera!);
    };
    animate();
  }

  resizeRendererToDisplaySize() {
    if (this.renderer && this.camera) {
      const canvas = this.renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        this.renderer.setSize(width, height, false);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }
    }
  }

  zoomCamera(camera: THREE.PerspectiveCamera) {
    this.isAnimating = true;
    this.controls!.enabled = false;

    const from = { z: 1000 };
    const to = { z: 3.1 };
    const duration = 2000;

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

  fadeOutElements() {
    const backdrop = document.getElementById('backdrop');
    const overlay = document.getElementById('overlay');
    if (backdrop) {
      backdrop.style.opacity = '0';
    }
    if (overlay) {
      overlay.style.opacity = '0';
    }
  }

  fadeInElements() {
    const backdrop = document.getElementById('backdrop');
    const overlay = document.getElementById('overlay');
    if (backdrop) {
      backdrop.style.opacity = '1';
    }
    if (overlay) {
      overlay.style.opacity = '1';
    }
  }
}
