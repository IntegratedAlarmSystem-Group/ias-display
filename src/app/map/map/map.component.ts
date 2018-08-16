import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() mapdataAvailable = false;
  @Input() mapConfig = {};

  constructor() { }

  ngOnInit() {
  }

}
