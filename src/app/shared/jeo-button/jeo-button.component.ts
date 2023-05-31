import { Component, HostBinding, Input } from '@angular/core';

type ButtonTheme = 'primary' | 'primary-inverse' | 'secondary' | 'secondary-inverse' | 'dark' | 'dark-inverse';

enum ButtonThemeClass {
  'primary' = 'jeo-button-primary',
  'primary-inverse' = 'jeo-button-primary-inverse',
  'secondary' = 'jeo-button-secondary',
  'secondary-inverse' = 'jeo-button-secondary',
  'dark' = 'jeo-button-dark',
  'dark-inverse' = 'jeo-button-dark-inverse'
}

@Component({
  selector: 'button[jeo-button]',
  template: `<ng-content></ng-content>`
})
export class JeoButtonComponent {

  @Input() theme: ButtonTheme = 'primary';

  @HostBinding('attr.class')
  get getClass() {
    return `jeo-button ${ButtonThemeClass[this.theme]}`;
  }

}
