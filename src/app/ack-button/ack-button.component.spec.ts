import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckButtonComponent } from './ack-button.component';

describe('AckButtonComponent', () => {
  let component: AckButtonComponent;
  let fixture: ComponentFixture<AckButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
