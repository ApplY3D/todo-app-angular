import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [BrowserModule],
  providers: [AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
