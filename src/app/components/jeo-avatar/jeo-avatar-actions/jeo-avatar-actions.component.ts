import { Component } from '@angular/core';

@Component({
  selector: 'jeo-avatar-actions',
  template: `
    <div class="jeo-avatar-actions w-100 h-100">
		<ng-content></ng-content>
	</div>
  `
})
export class JeoAvatarActionsComponent {
}
