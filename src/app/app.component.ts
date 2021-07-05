import { Component } from '@angular/core';
import { AlertService } from './alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private alertService: AlertService) {}

  alert() {
    this.alertService.danger('hello');
  }
}
