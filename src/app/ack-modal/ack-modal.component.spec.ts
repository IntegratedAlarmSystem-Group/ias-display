import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckModalComponent } from './ack-modal.component';

describe('AckModalComponent', () => {
  let component: AckModalComponent;
  let fixture: ComponentFixture<AckModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
