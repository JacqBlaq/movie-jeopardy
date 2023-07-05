import { Component, Input } from '@angular/core';

@Component({
  selector: 'jeo-leaderboard-content',
  template: `
	<ng-content></ng-content>
  `,
})
export class JeoLeaderboardContentComponent {
	@Input() theme: 'light' | 'dark' = 'light';
}
