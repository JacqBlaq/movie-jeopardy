import { Injectable, SimpleChange } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	private readonly _BROWSER_REFRESHED$ = new BehaviorSubject<boolean>(false);

	browserRefreshed$ = this._BROWSER_REFRESHED$.asObservable();

	/** Updates `browserRefreshed$` variable. */
	setBrowserRefreshed(value: boolean): void {
		this._BROWSER_REFRESHED$.next(value);
	}

	/**
	 * Checks if a property change is valid or not.
	 * @param change - Possible chhange from a previous to a new value of a property.
	 * @returns Whether the new value is different from the previous value.
	 */
	static isValidChange(change: SimpleChange): boolean {
		return change?.previousValue !== change?.currentValue;
	}
}
