import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UtilsService } from './services/utils.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
	subscription$?: Subscription;

	constructor(
		private readonly router: Router,
		private readonly utils: UtilsService) {
		this.subscription$ = router.events
			.pipe(filter((event) => event instanceof NavigationStart))
			.subscribe(() => {
				utils.setBrowserRefreshed(!router.navigated);
		});
	}

	ngOnDestroy(): void {
		this.subscription$?.unsubscribe();
	}
}
