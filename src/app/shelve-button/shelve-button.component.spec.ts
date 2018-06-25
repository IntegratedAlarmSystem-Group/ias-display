import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelveButtonComponent } from './shelve-button.component';

describe('ShelveButtonComponent', () => {
  let component: ShelveButtonComponent;
  let fixture: ComponentFixture<ShelveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
