import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AckTreeComponent, AlarmItemNode } from './ack-tree.component';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { expectedTreeData, mockAlarmData } from './fixtures';


fdescribe('GIVEN an AckTreeComponent, with a selectedAlarm with a subtree', () => {
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

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The component should retrieve the tree data according to the selectedAlarm and its children', () => {
    const treeData = component.getTreeData();
    expect(treeData).toEqual(expectedTreeData);
  });

  describe('WHEN the user selects 1 grand-child alarm', () => {
    it('THEN the ackList should contain that (and only that) alarm', () => {
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const node = component.dataSource.data[0]['children'][0]['children'][1]; // Get node corresponding to 'grandChild_2'
      const flatNode = component.nestedNodeMap.get(node); // Transform to FlatNode
      const alarmsToSelect = [flatNode.item]; // Get Alarm name from FlatNode
      expect(alarmsToSelect).toEqual(['grandChild_12']);
      const expectedAckList = alarmsToSelect;
      component.alarmItemSelectionToggle(flatNode); // Select the flatNode
      component.updateAckList();
      fixture.detectChanges();
      expect(component.ackList).toEqual(expectedAckList);
    });
  });

  describe('WHEN the user selects 2 of its grand-children alarms', () => {
    it('THEN the ackList should contain those (and only those) alarms', () => {
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      const alarmsToSelect = [flatNode1.item, flatNode2.item];
      expect(alarmsToSelect).toEqual(['grandChild_12', 'grandChild_13']);
      const expectedAckList = alarmsToSelect;
      component.alarmItemSelectionToggle(flatNode1);
      component.alarmItemSelectionToggle(flatNode2);
      component.updateAckList();
      fixture.detectChanges();
      expect(component.ackList).toEqual(expectedAckList);
    });
  });

  describe('WHEN the user selects all the children of one of its children', () => {
    it('THEN the ackList should contain those grand-children and their father', () => {
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      const alarmsToSelect = [flatNode0.item, flatNode1.item, flatNode2.item];
      expect(alarmsToSelect).toEqual(['grandChild_11', 'grandChild_12', 'grandChild_13']);
      const expectedAckList = ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13'];
      component.alarmItemSelectionToggle(flatNode0);
      component.alarmItemSelectionToggle(flatNode1);
      component.alarmItemSelectionToggle(flatNode2);
      component.updateAckList();
      fixture.detectChanges();
      console.log('CASE 3, component.ackList: ', component.ackList);
      expect(component.ackList).toEqual(expectedAckList);
    });
  });

  describe('WHEN the user selects 1 of its children', () => {
    it('THEN the ackList should contain the selected child Alarm and its children Alarms', () => {
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      const alarmsToSelect = [flatNode.item];
      expect(alarmsToSelect).toEqual(['child_1']);
      const expectedAckList = ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13'];
      component.alarmItemSelectionToggle(flatNode);
      component.updateAckList();
      fixture.detectChanges();
      console.log('CASE 4, component.ackList: ', component.ackList);
      expect(component.ackList).toEqual(expectedAckList);
    });
  });

  describe('WHEN the user selects all of its children', () => {
    it('THEN the ackList should contain all the Alarms', () => {
      component.ngOnInit();
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][1]);
      const alarmsToSelect = [flatNode0.item, flatNode1.item];
      expect(alarmsToSelect).toEqual(['child_1', 'child_2']);
      const expectedAckList =
        ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13', 'child_2', 'grandChild_21', 'grandChild_22', 'grandChild_23'];
      component.alarmItemSelectionToggle(flatNode0);
      component.alarmItemSelectionToggle(flatNode1);
      component.updateAckList();
      fixture.detectChanges();
      console.log('CASE 5, component.ackList: ', component.ackList);
      expect(component.ackList).toEqual(expectedAckList);
    });
  });
});
