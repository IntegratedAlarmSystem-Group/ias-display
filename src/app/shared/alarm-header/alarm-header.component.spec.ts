import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmHeaderComponent } from './alarm-header.component';

describe('AlarmHeaderComponent', () => {
  let component: AlarmHeaderComponent;
  let fixture: ComponentFixture<AlarmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
