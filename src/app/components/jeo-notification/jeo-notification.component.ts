import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Notification } from '../../models/notification.type';

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
				theme="secondary-dark">{{settings.actionBtnText}}</button>
		</div>
	`,
})
export class JeoNotificationComponent {
	settings!: Notification;

	constructor(
		public snackBarRef: MatSnackBarRef<JeoNotificationComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: Notification) {
		this.settings = data;
	}

	/** Closes notification pop-up. */
	closeNotification(): void {
		this.snackBarRef.dismissWithAction();
	 }
}
