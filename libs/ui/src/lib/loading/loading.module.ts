import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

import { LoadingComponent } from './loading.component';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [MatProgressSpinnerModule, OverlayModule],
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class LoadingModule { }
