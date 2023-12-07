import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarsWeatherPanelComponent } from './mars-weather-panel/mars-weather-panel.component';

const routes: Routes = [
  {
    path: 'mars-weather-panel',
    component: MarsWeatherPanelComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
