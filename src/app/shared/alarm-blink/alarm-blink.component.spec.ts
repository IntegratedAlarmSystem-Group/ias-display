import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBlinkComponent } from './alarm-blink.component';

describe('AlarmBlinkComponent', () => {
  let component: AlarmBlinkComponent;
  let fixture: ComponentFixture<AlarmBlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
