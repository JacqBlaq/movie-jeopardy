import { Component } from '@angular/core';

@Component({
  selector: 'jeo-slab-header',
  template: `
	<ng-content></ng-content>

	<div class="jeo-slab-button-container">
		<ng-content select="[jeo-button]"></ng-content>
	</div>
  `
})
export class JeoSlabHeaderComponent {}
