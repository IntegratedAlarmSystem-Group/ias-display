import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelveComponent } from './shelve.component';

describe('ShelveComponent', () => {
  let component: ShelveComponent;
  let fixture: ComponentFixture<ShelveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
