import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit, Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { of as ofObservable, Observable, BehaviorSubject } from 'rxjs';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

/**
 * Node for an alarm item
 */
export class AlarmItemNode {
  children: AlarmItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class AlarmItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
* Tree with checkboxes for a list of alarms
*
* Based on the angular material documentation for the tree component
*
*/
@Component({
  selector: 'app-ack-tree',
  templateUrl: 'ack-tree.component.html',
  styleUrls: ['ack-tree.component.scss']
})
export class AckTreeComponent implements OnInit {

  /** The parent Alarm of the tree  */
  @Input() selectedAlarm: Alarm;

  /** EventEmitter used to send the selected alarms to the parent component */
  @Output() alarmsToAckFromSelection = new EventEmitter();

  /** Tree data with dependencies for the selected alarm **/
  treeData = {};

  /** List with ids to ack **/
  ackList: string[] = [];

  /** Map from flat node to nested node. This helps us finding a nested node to be modified */
  flatNodeMap: Map<AlarmItemFlatNode, AlarmItemNode> = new Map<AlarmItemFlatNode, AlarmItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<AlarmItemNode, AlarmItemFlatNode> = new Map<AlarmItemNode, AlarmItemFlatNode>();

  /** Angular Material Flat tree control. Able to expand/collapse a subtree recursively for flattened tree. */
  treeControl: FlatTreeControl<AlarmItemFlatNode>;

  /** Angular Material Tree flattener to convert a normal type of node to node with children & level information */
  treeFlattener: MatTreeFlattener<AlarmItemNode, AlarmItemFlatNode>;

  /** Angular Material Data source for the flat tree */
  dataSource: MatTreeFlatDataSource<AlarmItemNode, AlarmItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<AlarmItemFlatNode>(true /* multiple */);

  /**
   * Instantiates the component
   * @param {AlarmService} alarmService Service used to send the request to acknowledge the alarm
   */
  constructor(private alarmService: AlarmService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<AlarmItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.checklistSelection.onChange.subscribe(data => {
      this.updateAckList();
    });
  }

  /**
   * Creates the component and builds the tree reading the data from the alarm
   */
  ngOnInit() {
    this.dataSource.data = this.buildFileTree(this.getTreeDataFromAlarm(this.selectedAlarm), 0);
  }

  /**
  * Retuns the level of a given node
  * @param {AlarmItemFlatNode} node the node
  * @returns {number} the level of the node
  */
  getLevel = (node: AlarmItemFlatNode) => node.level;

  /**
  * Checks wether or not the node is expandable
  * @param {AlarmItemFlatNode} node the node
  * @returns {boolean} true if the node is expandable, false if not
  */
  isExpandable = (node: AlarmItemFlatNode) => node.expandable;

  /**
  * Retuns the children of the node, as an Observable
  * @param {AlarmItemFlatNode} node the node
  * @returns {Observable} the children the node
  */
  getChildren = (node: AlarmItemNode): Observable<AlarmItemNode[]> => {
    return ofObservable(node.children);
  }

  /**
  * Checks wether or not the node has children
  * @param {AlarmItemFlatNode} node the node
  * @returns {boolean}  true if the node has a child, false if not
  */
  hasChild = (_: number, _nodeData: AlarmItemFlatNode) => _nodeData.expandable;

  /**
  * Checks wether or not the node has no content
  * @param {AlarmItemFlatNode} node the node
  * @returns {boolean}  true if the node has no content, false if not
  */
  hasNoContent = (_: number, _nodeData: AlarmItemFlatNode) => _nodeData.item === '';

  /**
   * Tree data from selected alarm
   * @returns {dictionary}  the tree data in a JSON format
   */
  getTreeDataFromAlarm(alarm: Alarm) {
     // TODO: Update definition for alarms with more than one dependency level
     const tree_data = {};
     if (alarm.dependencies.length === 0) {
       tree_data[alarm.core_id] = null;
     } else {
       tree_data[alarm.core_id] = [];
       for (const item of alarm.dependencies) {
         tree_data[alarm.core_id].push(item);
       }
     }
     return tree_data;
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * @param {any} value the node as a Json object, or a sub-tree of a Json object.
   * @param {number} level the level of the node
   * @returns {list} the list of `AlarmItemNode`.
   */
  buildFileTree(value: any, level: number) {
    const data: any[] = [];
    for (const k in value) {
      if (k in value) {
        const v = value[k];
        const node = new AlarmItemNode();
        node.item = `${k}`;
        if (v === null || v === undefined) {
          // no action
        } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v, level + 1);
      } else {
        node.item = v;
      }
      data.push(node);
      }
    }
    return data;
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   * @param {AlarmItemNode} node the node
   * @param {number} level the level node
   * @returns {flatNode} the node converted to a FlatNode
   */
  transformer = (node: AlarmItemNode, level: number) => {
    let flatNode;
    if (this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node) !== null && this.nestedNodeMap.get(node).item === node.item) {
      flatNode = this.nestedNodeMap.get(node);
    } else {
      flatNode = new AlarmItemFlatNode();
    }
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /**
  * Checks whether all the descendants of the node are selected
  * @returns {boolean} true if all the descendants of the node are selected, false if not
  */
  descendantsAllSelected(node: AlarmItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /**
  * Checks whether part of the descendants are selected
  * @returns {boolean} true if some of the descendents are selected, false if not
  */
  descendantsPartiallySelected(node: AlarmItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    if (this.descendantsAllSelected(node)) {
      this.checklistSelection.select(node);
    }
    return result && !this.descendantsAllSelected(node);
  }

  /**
  * Checks wether or not the node has selected dependencies
  * @returns {boolean} true if the node has no selected descendents, false if not
  */
  noSelectedDescendants(node: AlarmItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    if (!result) {
      this.checklistSelection.deselect(node);
    }
    return !result;
  }

  /** Toggle the alarm item selection. Select/deselect all the descendants node */
  alarmItemSelectionToggle(node: AlarmItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

  /** Update list with ids to ack **/
  updateAckList(): void {
    this.ackList = [];
    const selected = this.checklistSelection.selected;
    selected.forEach( (flatNode) => {
      if (flatNode.expandable === false) {
        this.ackList.push(flatNode.item);
      }
    });
    this.alarmsToAckFromSelection.emit(this.ackList);
  }

}
