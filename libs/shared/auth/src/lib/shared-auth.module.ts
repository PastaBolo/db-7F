import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyChZowspTUMHIZOdyjXs7L2NbNJGht1jt8',
      authDomain: 'seven-platform-d50b6.firebaseapp.com',
      projectId: 'seven-platform-d50b6',
      storageBucket: 'seven-platform-d50b6.appspot.com',
      messagingSenderId: '141611937037',
      appId: '1:141611937037:web:77d6b99865b50b9d631444',
      measurementId: 'G-2TT1F3365F',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class SharedAuthModule {}
