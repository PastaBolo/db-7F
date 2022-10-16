import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['auth']) },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@seven-fallen/home').then((m) => m.HomeModule),
      },
      {
        path: 'decks',
        loadChildren: () =>
          import('@seven-fallen/deckbuilder').then((m) => m.DeckbuilderModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('@seven-fallen/auth').then((m) => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['']) },
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
