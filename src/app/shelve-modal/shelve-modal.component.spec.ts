import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelveModalComponent } from './shelve-modal.component';

describe('ShelveModalComponent', () => {
  let component: ShelveModalComponent;
  let fixture: ComponentFixture<ShelveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
