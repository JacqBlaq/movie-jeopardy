import { Component, Input } from '@angular/core';
import { HeaderTheme, HeaderThemeClass } from 'src/app/models/header.type';

@Component({
	selector: 'jeo-header',
	template: `
		<div class="jeo-header {{getThemeClass}}">
			<div class="jeo-header-line"></div>
			<div class="jeo-header-title">
				<h4 *ngIf="labelText.trim().length" class="jeo-header-text">{{labelText}}</h4>
				<ng-content></ng-content>
			</div>
		</div>
	`,
})
export class JeoHeaderComponent {

	@Input() labelText: string = '';
	@Input() theme: HeaderTheme = 'primary';

	/** Gets class names based on `theme` */
	get getThemeClass(): string {
		return HeaderThemeClass[this.theme];
	}
}
