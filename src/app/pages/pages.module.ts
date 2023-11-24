import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwiperModule } from 'swiper/angular';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '../core/common/pipes/date.pipe';
import { CardPrincipalComponent } from '../theme/components/card-principal/card-principal.component';
import { CardHomeComponent } from '../theme/components/cards-home/card-home.component';
import { CarouselComponent } from '../theme/components/carousel/carousel.component';
import { LogoutComponent } from '../theme/components/logout/logout.component';
import { PageTitleComponent } from '../theme/components/page-title/page-title.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { MarsWeatherPanelComponent } from './mars-weather-panel/mars-weather-panel.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';

@NgModule({
  declarations: [
    LoadingComponent,
    MarsWeatherPanelComponent,
    UnsubscribeComponent,
    LogoutComponent,
    HomeComponent,
    PageTitleComponent,
    CardPrincipalComponent,
    CardHomeComponent,
    CarouselComponent,
    DatePipe,
    HomeComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SwiperModule, MatButtonModule, MatCardModule ],
})
export class PagesModule {}
