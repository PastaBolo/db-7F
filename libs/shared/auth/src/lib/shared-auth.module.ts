import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';

import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCaBAQrcuQGw-5_2zr8YYtXq4tYv7u-YU4',
      authDomain: 'seven-auth.firebaseapp.com',
      projectId: 'seven-auth',
      storageBucket: 'seven-auth.appspot.com',
      messagingSenderId: '568545270190',
      appId: '1:568545270190:web:57b0c23a3bb9eec785503f',
    }),
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class SharedAuthModule {}
