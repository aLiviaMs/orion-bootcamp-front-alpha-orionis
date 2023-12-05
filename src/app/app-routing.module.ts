import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuardService } from './core/services/auth-guard.service';
import { PagesModule } from './pages/pages.module';
import { MarsWeatherPanelComponent } from '../app/pages/mars-weather-panel/mars-weather-panel.component';

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
  { path: 'mars-weather-panel', component: MarsWeatherPanelComponent },

  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
