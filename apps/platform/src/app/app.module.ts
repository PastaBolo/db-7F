import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SharedAuthModule } from '@seven-fallen/shared/auth';
import {
  ErrorHandlerModule,
  LoadingModule,
  PermissionsModule,
} from '@seven-fallen/ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiUrlInterceptor } from './core';
import { MaintenanceModaleComponent } from './maintenance-modale.component';

@NgModule({
  declarations: [AppComponent, MaintenanceModaleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    SharedAuthModule,
    MatDialogModule,
    PermissionsModule,
    MatDialogModule,
    MatButtonModule,
    LoadingModule,
    ErrorHandlerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
