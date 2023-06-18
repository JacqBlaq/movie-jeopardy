import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export type NotificationSetting = {
	titleText?: string;
	subTitleText?: string;
	subMessage?: string;
	message: string;
	icon?: string;
	actionBtnText?: string;
	customClass?: string;
}

@Component({
	selector: 'jeo-notification',
	template: `
		<div class="jeo-notification {{settings.customClass}}">
			<div class="jeo-notification-info">
				<h6 *ngIf="settings.titleText" class="jeo-notification-title">
					<mat-icon *ngIf="settings.icon">{{settings.icon}}</mat-icon>{{settings.titleText}}
				</h6>
				<div *ngIf="settings.subTitleText || settings.subMessage" class="jeo-notification-subtitle">
					<small *ngIf="settings.subTitleText">{{settings.subTitleText}}</small>
					<div *ngIf="settings.subMessage"
						class="jeo-notification-submessage"
						[innerHTML]="settings.subMessage"></div>
				</div>
				<div *ngIf="settings.message" class="jeo-notification-message"
					[innerHTML]="settings.message"></div>
			</div>

			<button jeo-button type="button"
				*ngIf="settings.actionBtnText"
				(click)="closeNotification()"
				theme="primary-dark">{{settings.actionBtnText}}</button>
		</div>
	`,
})
export class JeoNotificationComponent {
	settings!: NotificationSetting;

	/**
	 * @param {NotificationSetting} data - Notification settings.
	 */
	constructor(
		public snackBarRef: MatSnackBarRef<JeoNotificationComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: NotificationSetting) {
		this.settings = data;
	}

	/** Closes notification pop-up. */
	closeNotification(): void {
		this.snackBarRef.dismissWithAction();
	 }
}
