import { Component, HostBinding, Input } from '@angular/core';

export type ButtonTheme =
	| 'primary'
	| 'primary-inverse'
	| 'secondary'
	| 'secondary-inverse'
	| 'dark'
	| 'dark-inverse';

enum ButtonThemeClass {
	'primary' = 'jeo-button-primary',
	'primary-inverse' = 'jeo-button-primary-inverse',
	'secondary' = 'jeo-button-secondary',
	'secondary-inverse' = 'jeo-button-secondary-inverse',
	'dark' = 'jeo-button-dark',
	'dark-inverse' = 'jeo-button-dark-inverse',
}

@Component({
	selector: 'button[jeo-button], a[jeo-button]',
	template: `<ng-content></ng-content>`,
})
export class JeoButtonComponent {
	@Input() theme: ButtonTheme = 'primary';

	/**
	 * @description
	 * Set class names based on `theme`
	 */
	@HostBinding('attr.class')
	get getClass(): string {
		return `jeo-button ${ButtonThemeClass[this.theme]}`;
	}
}
