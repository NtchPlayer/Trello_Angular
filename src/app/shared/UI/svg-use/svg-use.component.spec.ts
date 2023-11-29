import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgUseComponent } from './svg-use.component';

describe('SvgUseComponent', () => {
  let component: SvgUseComponent;
  let fixture: ComponentFixture<SvgUseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgUseComponent]
    });
    fixture = TestBed.createComponent(SvgUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
