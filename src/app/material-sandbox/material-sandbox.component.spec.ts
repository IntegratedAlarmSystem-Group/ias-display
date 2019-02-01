import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialSandboxComponent } from './material-sandbox.component';

xdescribe('MaterialSandboxComponent', () => {
  let component: MaterialSandboxComponent;
  let fixture: ComponentFixture<MaterialSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
