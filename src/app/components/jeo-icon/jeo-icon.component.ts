import { Component, Input } from '@angular/core';

@Component({
	selector: 'jeo-icon',
	template: `
		<mat-icon *ngIf="iconName"
			[matTooltip]="toolTipMessage">{{iconName}}</mat-icon>
	`,
})
export class JeoIconComponent {
	@Input() iconName?: string;
	@Input() toolTipMessage: string = '';
}
