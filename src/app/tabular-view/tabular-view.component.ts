import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatTableDataSource } from '@angular/material';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";

@Injectable()
export class ElementService {
  findElements(courseId:number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3):  Observable<Element[]> {
    return Observable.of(ELEMENT_DATA);
  }
}

@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.css']
})
export class TabularViewComponent {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: ElementsDataSource;

  constructor(private elementService: ElementService) {}

  ngOnInit() {
    this.dataSource = new ElementsDataSource(this.elementService);
    this.dataSource.loadElements(1);
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
}

export class ElementsDataSource implements DataSource<Element> {

  private elementsSubject = new BehaviorSubject<Element[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private elementService: ElementService) {}

  connect(collectionViewer: CollectionViewer): Observable<Element[]> {
      return this.elementsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.elementsSubject.complete();
      this.loadingSubject.complete();
  }

  loadElements(courseId: number, filter = '',
              sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    this.loadingSubject.next(true);

    this.elementService.findElements(courseId, filter, sortDirection, pageIndex, pageSize)
    // .pipe(
    //   catchError(() => of([])),
    //   finalize(() => this.loadingSubject.next(false))
    // )
    .subscribe(elements => this.elementsSubject.next(elements));
  }
}


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
