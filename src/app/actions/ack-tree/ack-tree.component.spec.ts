import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AckTreeComponent } from './ack-tree.component';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { expectedTreeData, mockAlarmData } from './fixtures';


fdescribe('AckTreeComponent', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;
  let alarmService: AlarmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckTreeComponent
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckTreeComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    alarmService.readAlarmMessagesList(mockAlarmData);
    component.selectedAlarm = alarmService.get(mockAlarmData[0]['core_id']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given a parent Alarm with 2 children and 3 grand children per children', () => {
    it('The component should retrieve the tree data accordingly', () => {
      expect(component).toBeTruthy();
      console.log('\n*** expectedTreeData: ', expectedTreeData);
      const treeData = component.getTreeData();
      console.log('\n*** treeData: ', treeData);
      expect(treeData).toEqual(expectedTreeData);
    });
  });
});
