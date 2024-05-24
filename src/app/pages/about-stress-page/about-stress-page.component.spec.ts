import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStressPageComponent } from './about-stress-page.component';

describe('AboutStressPageComponent', () => {
  let component: AboutStressPageComponent;
  let fixture: ComponentFixture<AboutStressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutStressPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutStressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
