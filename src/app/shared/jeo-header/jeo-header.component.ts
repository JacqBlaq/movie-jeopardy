import { Component, HostBinding, Input, OnInit } from '@angular/core';

export type HeaderTheme = 'primary' | 'warning' | 'danger' | 'dark';

enum HeaderThemeClass {
  'primary' = '',
  'warning' = 'warning-header',
  'danger' = 'danger-header',
  'dark' = 'dark-header'
}

@Component({
  selector: 'jeo-header',
  template: `
  <div class="jeo-header {{getThemeClass}}">
    <div class="jeo-header-line"></div>
    <div class="jeo-header-title">
      <h4 class="jeo-header-text" [innerHTML]="labelText"></h4>
    </div>
  </div>
  `
})
export class JeoHeaderComponent {

  @Input() labelText: string = '';
  @Input() theme: HeaderTheme = 'primary';

  get getThemeClass(): string {
    return HeaderThemeClass[this.theme];
  }


}
