import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService, IAlert } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 7000;
  public alert: IAlert | null;
  alertSub: Subscription;
  timeout: ReturnType<typeof setTimeout>;

  constructor(private alertService: AlertService) {}

  private closeAlert() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.alert = null;
    }
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.alertService.alert$.subscribe((alert) => {
      this.alert = { ...alert };
      this.timeout = setTimeout(() => {
        this.closeAlert();
      }, this.delay);
    });
  }

  onClose() {
    this.closeAlert();
  }
}
