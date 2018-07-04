import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiButtonComponent } from './wiki-button.component';

describe('WikiButtonComponent', () => {
  let component: WikiButtonComponent;
  let fixture: ComponentFixture<WikiButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
