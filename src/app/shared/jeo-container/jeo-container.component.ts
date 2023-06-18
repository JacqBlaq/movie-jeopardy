import { Component, Input } from '@angular/core';

@Component({
	selector: 'jeo-container',
	templateUrl: './jeo-container.component.html',
	host: {
		'[class.radial-gradient]': 'theme === "radial-gradient"',
		'[class.linear-gradient]': 'theme === "linear-gradient"'
	}
})
export class JeoContainerComponent {

	@Input() theme: 'default' | 'radial-gradient' | 'linear-gradient' = 'default';
}
