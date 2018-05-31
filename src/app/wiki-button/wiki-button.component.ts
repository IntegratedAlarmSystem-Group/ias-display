import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wiki-button',
  templateUrl: './wiki-button.component.html',
  styleUrls: ['./wiki-button.component.css']
})
export class WikiButtonComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }


}
