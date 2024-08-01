import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyOwnerComponent } from './property-owner.component';

describe('PropertyOwnerComponent', () => {
  let component: PropertyOwnerComponent;
  let fixture: ComponentFixture<PropertyOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
