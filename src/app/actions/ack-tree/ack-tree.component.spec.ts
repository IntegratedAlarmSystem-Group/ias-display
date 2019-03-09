import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AckTreeComponent, AlarmItemFlatNode } from './ack-tree.component';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { expectedTreeData, mockAlarmData } from './fixtures';


describe('GIVEN an AckTreeComponent, with a selectedAlarm with a subtree', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;
  let alarmService: AlarmService;

  function getSelectedAlarms(_: AlarmItemFlatNode[]): any[] {
    const alarms = [];
    component.checklistSelection.selected.forEach( (flatNode) => {
      alarms.push(flatNode.item);
    });
    return alarms;
  }

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

  describe('WHEN the user selects 1 grand-children alarm', () => {
    it('THEN only that alarm should be selected and in the ackList', () => {
      component.ngOnInit();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const node = component.dataSource.data[0]['children'][0]['children'][1]; // Get node corresponding to 'grandChild_2'
      const flatNode = component.nestedNodeMap.get(node); // Transform to FlatNode
      expect(flatNode.item).toEqual('grandChild_12'); // Check that we got the correct node
      const expectedSelectedAlarms = ['grandChild_12'];
      const expectedAckList = ['grandChild_12'];
      component.alarmItemSelectionToggle(flatNode); // Select the flatNode
      component.updateAckList();
      fixture.detectChanges();
      const selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
      expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
      expect(component.ackList.sort()).toEqual(expectedAckList.sort());
    });
  });

  describe('WHEN the user selects 2 of its grand-children alarms', () => {
    it('THEN only those alarms should be selected and in the ackList', () => {
      component.ngOnInit();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      expect([flatNode1.item, flatNode2.item]).toEqual(['grandChild_12', 'grandChild_13']); // Check that we got the correct node
      const expectedAckList = ['grandChild_12', 'grandChild_13'];
      const expectedSelectedAlarms = ['grandChild_12', 'grandChild_13'];
      component.alarmItemSelectionToggle(flatNode1);
      component.alarmItemSelectionToggle(flatNode2);
      component.updateAckList();
      fixture.detectChanges();
      const selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
      expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
      expect(component.ackList.sort()).toEqual(expectedAckList.sort());
    });
  });

  describe('WHEN the user selects all the children of one of its children', () => {
    it('THEN only those alarms should in the ackList, but those alarms and their parent should be selected', () => {
      component.ngOnInit();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      expect([flatNode0.item, flatNode1.item, flatNode2.item]).toEqual(['grandChild_11', 'grandChild_12', 'grandChild_13']);
      const expectedAckList = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
      const expectedSelectedAlarms = ['grandChild_11', 'grandChild_12', 'grandChild_13', 'child_1'];
      component.alarmItemSelectionToggle(flatNode0);
      component.alarmItemSelectionToggle(flatNode1);
      component.alarmItemSelectionToggle(flatNode2);
      component.updateAckList();
      fixture.detectChanges();
      const selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
      expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
      expect(component.ackList.sort()).toEqual(expectedAckList.sort());
    });
  });

  describe('WHEN the user selects 1 of its children', () => {
    it('THEN that children and its children (grandchildren) should be selected, but the ackList should contain only grandchildren', () => {
      component.ngOnInit();
      component.treeControl.expandAll();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      expect(flatNode.item).toEqual('child_1');
      const expectedAckList = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
      const expectedSelectedAlarms = ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13'];
      component.alarmItemSelectionToggle(flatNode);
      component.updateAckList();
      fixture.detectChanges();
      const selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
      expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
      expect(component.ackList.sort()).toEqual(expectedAckList.sort());
    });
  });

  describe('WHEN the user selects all of its children', () => {
    it('THEN all the Alarms should be selected and the ackList should contain all the grand-children level Alarms', () => {
      component.ngOnInit();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][1]);
      expect([flatNode0.item, flatNode1.item]).toEqual(['child_1', 'child_2']);
      const expectedAckList =
        ['grandChild_11', 'grandChild_12', 'grandChild_13', 'grandChild_21', 'grandChild_23'];
      const expectedSelectedAlarms = [
        'grandChild_11', 'grandChild_12', 'grandChild_13', 'grandChild_21', 'grandChild_23',
        'child_1', 'child_2', 'parent'
      ];
      component.alarmItemSelectionToggle(flatNode0);
      component.alarmItemSelectionToggle(flatNode1);
      component.updateAckList();
      fixture.detectChanges();
      const selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
      expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
      expect(component.ackList.sort()).toEqual(expectedAckList.sort());
    });
  });

  describe('GIVEN the user selects 1 of the grandchildren level Alarms', () => {
    describe('WHEN the user selects the parent of that grandchildren', () => {
      it('THEN that children and all its children should be selected, but the ackList should contain only grandchildren', () => {
        component.ngOnInit();
        component.treeControl.expandAll();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const grandChildrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
        const childrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
        expect([grandChildrenNode.item, childrenNode.item]).toEqual(['grandChild_12', 'child_1']); // Check that we got the correct node

        // FIRST: Select the grandchildren
        let expectedAckList = ['grandChild_12'];
        let expectedSelectedAlarms = ['grandChild_12'];
        component.alarmItemSelectionToggle(grandChildrenNode);
        component.updateAckList();
        fixture.detectChanges();
        let selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());

        // SECOND: Select the children
        expectedAckList = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
        expectedSelectedAlarms = ['grandChild_11', 'grandChild_12', 'grandChild_13', 'child_1'];
        component.alarmItemSelectionToggle(childrenNode);
        component.updateAckList();
        fixture.detectChanges();
        selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());
      });
    });
  });

  describe('GIVEN the user selects 1 of its children', () => {
    describe('WHEN the user deselects one of the children (grandchildren) of that children', () => {
      it('THEN the children is also selected, but the ackList should contain the still selected grandchildren', () => {
        component.ngOnInit();
        component.treeControl.expandAll();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const grandChildrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
        const childrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
        expect([grandChildrenNode.item, childrenNode.item]).toEqual(['grandChild_12', 'child_1']); // Check that we got the correct node

        // FIRST: Select the children
        let expectedAckList = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
        let expectedSelectedAlarms = ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13'];
        component.alarmItemSelectionToggle(childrenNode);
        component.updateAckList();
        fixture.detectChanges();
        let selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());

        // SECOND: Deselect the grandchildren
        expectedAckList = ['grandChild_11', 'grandChild_13'];
        expectedSelectedAlarms = ['grandChild_11', 'grandChild_13'];
        component.alarmItemSelectionToggle(grandChildrenNode);
        component.updateAckList();
        fixture.detectChanges();
        selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());
      });
    });
  });
});


describe('GIVEN an AckTreeComponent, with a selectedAlarm that can change', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: AckTreeComponent;
  let alarmService: AlarmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckTreeComponent,
        TestHostComponent
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
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    alarmService.readAlarmMessagesList(mockAlarmData);
    hostComponent.alarm = alarmService.get(mockAlarmData[0]['core_id']);
    component = fixture
      .debugElement.query(By.directive(AckTreeComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('GIVEN an update for the same alarm', () => {

    it('The component should update the data for the tree if there are changes on the alarm dependencies', () => {
      spyOn(component, 'updateData');
      const newExpectedTreeData = {
        'parent': {
          'child_1': {
            'grandChild_11': null,
            'grandChild_12': null,
            'grandChild_13': null,
          }
        }
      };
      const newMockAlarmData = [];
      for (const obj of mockAlarmData) {
        const updatedObj = Object.assign({}, obj);
        updatedObj['core_timestamp'] += 10;
        updatedObj['state_change_timestamp'] += 10;
        if (updatedObj['core_id'] === hostComponent.alarm['core_id']) {
          updatedObj['dependencies'] = ['child_1'];
        }
        newMockAlarmData.push(updatedObj);
      }
      alarmService.readAlarmMessagesList(newMockAlarmData);
      expect(component.getTreeData()).toEqual(expectedTreeData);
      // Act:
      hostComponent.alarm = alarmService.get(newMockAlarmData[0]['core_id']);
      fixture.detectChanges();
      // Assert:
      expect(component.updateData).toHaveBeenCalledTimes(1);
      expect(component.getTreeData()).toEqual(newExpectedTreeData);
    });

    it('The component should not update the data for the tree if there are no changes on the alarm dependencies', () => {
      spyOn(component, 'updateData');
      const newMockAlarmData = [];
      for (const obj of mockAlarmData) {
        const updatedObj = Object.assign({}, obj);
        updatedObj['core_timestamp'] += 10;
        updatedObj['state_change_timestamp'] += 10;
        newMockAlarmData.push(updatedObj);
      }
      alarmService.readAlarmMessagesList(newMockAlarmData);
      hostComponent.alarm = alarmService.get(newMockAlarmData[0]['core_id']);
      fixture.detectChanges();
      expect(component.updateData).toHaveBeenCalledTimes(0);
    });

  });

  describe('GIVEN consecutive and different alarms as input', () => {

    it('The component should update the data for the tree even if the dependencies are the same', () => {
      spyOn(component, 'updateData');
      const newMockAlarmData = [];
      for (const obj of mockAlarmData) {
        const updatedObj = Object.assign({}, obj);
        updatedObj['core_timestamp'] += 10;
        updatedObj['state_change_timestamp'] += 10;
        if (updatedObj['core_id'] === hostComponent.alarm['core_id']) {
          updatedObj['core_id'] += '2';
        }
        newMockAlarmData.push(updatedObj);
      }
      alarmService.readAlarmMessagesList(newMockAlarmData);
      hostComponent.alarm = alarmService.get(newMockAlarmData[0]['core_id']);
      fixture.detectChanges();
      expect(component.updateData).toHaveBeenCalledTimes(1);
    });

  });

});

describe('GIVEN an AckTreeComponent with an Alarm with no children', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;
  let alarmService: AlarmService;

  function getSelectedAlarms(_: AlarmItemFlatNode[]): any[] {
    const alarms = [];
    component.checklistSelection.selected.forEach( (flatNode) => {
      alarms.push(flatNode.item);
    });
    return alarms;
  }

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
    const alarm = JSON.parse(JSON.stringify(mockAlarmData[0]));
    alarm['dependencies'] = [];
    alarmService.readAlarmMessagesList([alarm]);
    component.selectedAlarm = alarmService.get(alarm['core_id']);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The component should retrieve a tree data with only 1 node', () => {
    const treeData = component.getTreeData();
    expect(treeData).toEqual( {'parent': null} );
  });
});

describe('GIVEN an AckTreeComponent with an Alarm whose children are all acknowledged', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;
  let alarmService: AlarmService;

  function getSelectedAlarms(_: AlarmItemFlatNode[]): any[] {
    const alarms = [];
    component.checklistSelection.selected.forEach( (flatNode) => {
      alarms.push(flatNode.item);
    });
    return alarms;
  }

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
    const myMockAlarms = [];
    for (const alarm of mockAlarmData) {
      if (alarm['core_id'] === 'parent') {
        myMockAlarms.push(JSON.parse(JSON.stringify(alarm)));
        continue;
      }
      const myAlarm = JSON.parse(JSON.stringify(alarm));
      myAlarm['ack'] = true;
      myMockAlarms.push(myAlarm);
    }
    alarmService.readAlarmMessagesList(myMockAlarms);
    component.selectedAlarm = alarmService.get(myMockAlarms[0]['core_id']);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The component should retrieve the tree data just like if the alarm had no dependencies', () => {
    const treeData = component.getTreeData();
    expect(treeData).toEqual( {'parent': null} );
  });
});

/**
 * Mock host component for the alarm tile to check behaviour on change
 */
@Component({
  selector: 'app-host',
  template: `
    <app-ack-tree
      [selectedAlarm]="alarm"
      (alarmsToAckFromSelection)="updateAlarmsToAck($event)"
    ></app-ack-tree>
  `,
})
class TestHostComponent {
  alarm: Alarm;
  alarmsToAck: string[] = [];
  updateAlarmsToAck(event: string[]): void {
    this.alarmsToAck = event;
  }
}
