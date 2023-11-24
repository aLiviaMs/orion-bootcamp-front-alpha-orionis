import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './core/services/auth-guard.service';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<AuthModule> | AuthModule[]> =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: (): Promise<Type<PagesModule> | PagesModule[]> =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: 'pages' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
