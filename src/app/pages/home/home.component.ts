import { animate, query, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { IHomeCard } from 'src/app/core/models/iHomeCard';
import SwiperCore, {
  Pagination,
  SwiperOptions
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('cardsAnimations', [
      transition('void => *', [
        query('.mars-cards', style({ transform: 'translateY(100%)'})),
        query('.mars-cards',
            animate('1000ms', style({ transform: 'translateY(0)'}))
        )
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-in-out'),
      ]),
    ]),
  ],
})

export class HomeComponent implements OnInit{
  @ViewChild(SwiperComponent) private sliderComponent?: SwiperComponent;
  public swiperHomeConfig!: SwiperOptions
  cards: IHomeCard[] = [
    { 
      title: "Meteorologia em Marte", 
      paragraph: "Veja a previsão do tempo em Marte ao vivo! Descubra como são as temperaturas no planeta vermelho", 
      img: "../../../assets/images/mars-ground.jpg", 
      imgAlt:"mars-terrain.jpeg",
      className: "forecast",
      callback: () => this.openNewTab('/pages/mars-weather-panel'),
    },
    { 
      title: "Nossa comunidade", 
      paragraph: "Entre em nossa comunidade e fique por dentro de todos os acontecimentos espaciais", 
      img: "../../../assets/images/mars-rockets.jpg", 
      imgAlt:"mars-rocket.jpeg",
      className: "community",
      callback: () => this.openNewTab("https://discord.com/invite/kCXUACrC3B"),
    },
    {
      title: "Notícias de Marte", 
      paragraph: "Ansioso por notícias? Entre no seu portal de notícias da Via Láctea!", 
      img: "../../../assets/images/mars-hover.jpg", 
      imgAlt:"mars-hover.jpeg",
      className: "blog",
      callback: () => this.openNewTab('https://exporion.blogspot.com/'),
    },
  ]  

  /**
   * Inicializa o swiper ao entrar na pagina
   * SwiperCore, passado para ele a variavel Pagination, para ser criada a paginacao dos cards
   * swiperHomeConifg, usado para configurar o slider para ser responsivo
   */
  public ngOnInit(): void {
    SwiperCore.use([Pagination]);
    this.swiperHomeConfig = {
      slidesPerView: 3,
      breakpoints: {
        50: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1080: {
          slidesPerView: 3,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,  
        dynamicBullets: true,
        dynamicMainBullets: 2,
      },
      breakpointsBase: "window",
    };
  }

  /**
   * Usado em qualquer botão, para redirecionar o usuário para 
   * alguma página fora do aplicativo por exemplo http://www.google.com
   * @param url Stirng contendo a url completa do site destino
   */
  public openNewTab(url: string): void {
    url.includes('/pages/mars-weather-panel') ? window.open(url, "_self") : window.open(url, '_blank') 
  }
}
