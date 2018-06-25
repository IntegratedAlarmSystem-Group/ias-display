import { Component, Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { of as ofObservable, Observable, BehaviorSubject } from 'rxjs';

/**
* Tree with checkboxes for a list of alarms
*
* Based on the angular material documentation for the tree component
*
*/

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
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  'WS-Meteo-130': [
    'WS-Meteo-130-Humidity',
    'WS-Meteo-130-Temperature',
    'WS-Meteo-130-WindSpeed'
  ],
  'Alarmdummy': null
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange: BehaviorSubject<AlarmItemNode[]> = new BehaviorSubject<AlarmItemNode[]>([]);

  get data(): AlarmItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `AlarmItemNode` with nested
    // file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `AlarmItemNode`.
   */
  buildFileTree(value: any, level: number) {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new AlarmItemNode();
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
    return data;
  }

}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-ack-tree',
  templateUrl: 'ack-tree.component.html',
  styleUrls: ['ack-tree.component.css'],
  providers: [ChecklistDatabase]
})
export class AckTreeComponent {
  /** Map from flat node to nested node. This helps us finding a nested node to be modified */
  flatNodeMap: Map<AlarmItemFlatNode, AlarmItemNode> = new Map<AlarmItemFlatNode, AlarmItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<AlarmItemNode, AlarmItemFlatNode> = new Map<AlarmItemNode, AlarmItemFlatNode>();

  /** A selected parent node */
  selectedParent: AlarmItemFlatNode | null = null;

  /** The new item's name */
  // newItemName: string = '';

  treeControl: FlatTreeControl<AlarmItemFlatNode>;

  treeFlattener: MatTreeFlattener<AlarmItemNode, AlarmItemFlatNode>;

  dataSource: MatTreeFlatDataSource<AlarmItemNode, AlarmItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<AlarmItemFlatNode>(true /* multiple */);

  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<AlarmItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: AlarmItemFlatNode) => { return node.level; };

  isExpandable = (node: AlarmItemFlatNode) => { return node.expandable; };

  getChildren = (node: AlarmItemNode): Observable<AlarmItemNode[]> => {
    return ofObservable(node.children);
  }

  hasChild = (_: number, _nodeData: AlarmItemFlatNode) => { return _nodeData.expandable; };

  hasNoContent = (_: number, _nodeData: AlarmItemFlatNode) => { return _nodeData.item === ''; };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: AlarmItemNode, level: number) => {
    let flatNode = this.nestedNodeMap.has(node) && this.nestedNodeMap.get(node)!.item === node.item
      ? this.nestedNodeMap.get(node)!
      : new AlarmItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: AlarmItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: AlarmItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the alarm item selection. Select/deselect all the descendants node */
  alarmItemSelectionToggle(node: AlarmItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }

}
