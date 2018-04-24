import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckModalComponent } from './ack-modal.component';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AckModalComponent', () => {
  let component: AckModalComponent;
  let fixture: ComponentFixture<AckModalComponent>;
  // let activeModal: NgbActiveModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckModalComponent ],
      // providers: [
      //   NgbActiveModal,
      // ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
