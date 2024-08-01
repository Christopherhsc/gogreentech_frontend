import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallersComponent } from './installers.component';

describe('InstallersComponent', () => {
  let component: InstallersComponent;
  let fixture: ComponentFixture<InstallersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
