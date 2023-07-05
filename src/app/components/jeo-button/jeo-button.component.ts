import { Component, HostBinding, Input } from '@angular/core';
import { ButtonTheme, ButtonThemeClass } from '../../models/button-theme.type';

@Component({
	selector: 'button[jeo-button], a[jeo-button]',
	template: `
		<ng-content></ng-content>
	`
})
export class JeoButtonComponent {
	@Input() theme: ButtonTheme = 'primary';
	@Input() customClass: string = '';

	@HostBinding('attr.class')
	get getClass(): string {
		return `jeo-button ${ButtonThemeClass[this.theme]} ${this.customClass}`;
	}
}
