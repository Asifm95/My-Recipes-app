import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedFeature: number = 1;

  constructor() {}

  ngOnInit() {}

  navSelected(feature: number) {
    this.selectedFeature = feature;
  }
}
