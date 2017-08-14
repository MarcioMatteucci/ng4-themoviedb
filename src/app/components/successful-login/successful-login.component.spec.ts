import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulLoginComponent } from './successful-login.component';

describe('SuccessfulLoginComponent', () => {
  let component: SuccessfulLoginComponent;
  let fixture: ComponentFixture<SuccessfulLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
