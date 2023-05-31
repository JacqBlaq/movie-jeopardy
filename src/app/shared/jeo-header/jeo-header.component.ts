import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jeo-header',
  template: `
  <div class="jeo-header">
    <div class="jeo-header-line"></div>
    <div class="jeo-header-title">
      <h4 class="jeo-header-text">{{labelText}}</h4>
    </div>
  </div>
  `
})
export class JeoHeaderComponent implements OnInit {

  @Input() labelText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
