import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsTableComponent } from './props-table.component';

describe('PropsTableComponent', () => {
  let component: PropsTableComponent;
  let fixture: ComponentFixture<PropsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
