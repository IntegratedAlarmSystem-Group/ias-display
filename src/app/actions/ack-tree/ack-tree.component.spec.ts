import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AckTreeComponent, AlarmItemNode, AlarmItemFlatNode } from './ack-tree.component';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { expectedTreeData, mockAlarmData } from './fixtures';


describe('GIVEN an AckTreeComponent, with a selectedAlarm with a subtree', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;
  let alarmService: AlarmService;

  function getSelectedAlarms(nodes: AlarmItemFlatNode[]): any[] {
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
      component.ngOnChanges();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const node = component.dataSource.data[0]['children'][0]['children'][1]; // Get node corresponding to 'grandChild_2'
      const flatNode = component.nestedNodeMap.get(node); // Transform to FlatNode
      expect(flatNode.item).toEqual('grandChild_12'); // Check that we got the correct node
      const alarmsToSelect = ['grandChild_12'];
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
      component.ngOnChanges();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      expect([flatNode1.item, flatNode2.item]).toEqual(['grandChild_12', 'grandChild_13']); // Check that we got the correct node
      const alarmsToSelect = ['grandChild_12', 'grandChild_13'];
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
      component.ngOnChanges();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
      const flatNode2 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][2]);
      const alarmsToSelect = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
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
      component.ngOnChanges();
      component.treeControl.expandAll();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      expect(flatNode.item).toEqual('child_1');
      const alarmsToSelect = ['child_1'];
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
      component.ngOnChanges();
      component.treeControl.expandAll();
      fixture.detectChanges();
      expect(component).toBeTruthy();
      const flatNode0 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
      const flatNode1 = component.nestedNodeMap.get(component.dataSource.data[0]['children'][1]);
      expect([flatNode0.item, flatNode1.item]).toEqual(['child_1', 'child_2']);
      const alarmsToSelect = ['child_1', 'child_2'];
      const expectedAckList =
        ['grandChild_11', 'grandChild_12', 'grandChild_13', 'grandChild_21', 'grandChild_22', 'grandChild_23'];
      const expectedSelectedAlarms = [
        'grandChild_11', 'grandChild_12', 'grandChild_13', 'grandChild_21', 'grandChild_22', 'grandChild_23',
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
        component.ngOnChanges();
        component.treeControl.expandAll();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const grandChildrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
        const childrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
        expect([grandChildrenNode.item, childrenNode.item]).toEqual(['grandChild_12', 'child_1']); // Check that we got the correct node

        // FIRST: Select the grandchildren
        let alarmsToSelect = ['grandChild_12'];
        let expectedAckList = ['grandChild_12'];
        let expectedSelectedAlarms = ['grandChild_12'];
        component.alarmItemSelectionToggle(grandChildrenNode);
        component.updateAckList();
        fixture.detectChanges();
        let selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());

        // SECOND: Select the children
        alarmsToSelect = ['child_1'];
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
        component.ngOnChanges();
        component.treeControl.expandAll();
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const grandChildrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]['children'][1]);
        const childrenNode = component.nestedNodeMap.get(component.dataSource.data[0]['children'][0]);
        expect([grandChildrenNode.item, childrenNode.item]).toEqual(['grandChild_12', 'child_1']); // Check that we got the correct node

        // FIRST: Select the children
        let alarmsToSelect = ['child_1'];
        let expectedAckList = ['grandChild_11', 'grandChild_12', 'grandChild_13'];
        let expectedSelectedAlarms = ['child_1', 'grandChild_11', 'grandChild_12', 'grandChild_13'];
        component.alarmItemSelectionToggle(childrenNode);
        component.updateAckList();
        fixture.detectChanges();
        let selectedAlarms = getSelectedAlarms(component.checklistSelection.selected);
        expect(selectedAlarms.sort()).toEqual(expectedSelectedAlarms.sort());
        expect(component.ackList.sort()).toEqual(expectedAckList.sort());

        // SECOND: Deselect the grandchildren
        alarmsToSelect = ['grandChild_12'];
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
