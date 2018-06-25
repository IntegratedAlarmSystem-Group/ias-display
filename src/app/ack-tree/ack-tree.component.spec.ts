import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckTreeComponent } from './ack-tree.component';

import { IasMaterialModule } from '../ias-material/ias-material.module';


describe('AckTreeComponent', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckTreeComponent ],
      imports: [ IasMaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
