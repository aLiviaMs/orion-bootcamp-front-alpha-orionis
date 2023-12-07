import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IHomeCard } from 'src/app/core/models/iHomeCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

export class HomeComponent {
  cards: IHomeCard[] = [
    { 
      title: "Meteorologia em Marte", 
      paragraph: "Veja a previsão do tempo em Marte ao vivo! Descubra como são as temperaturas no planeta vermelho", 
      img: "../../../assets/images/mars-ground.jpeg", 
      imgAlt:"mars-terrain.jpeg",
      className: "forecast",
      callback: () => this.openNewTab('/pages/mars-weather-panel'),
    },
    { 
      title: "Nossa comunidade", 
      paragraph: "Entre em nossa comunidade e fique por dentro de todos os acontecimentos espaciais", 
      img: "../../../assets/images/mars-rockets.jpeg", 
      imgAlt:"mars-rocket.jpeg",
      className: "community",
      callback: () => this.openNewTab("https://2no.co/exporion-discord"),
    },
    {
      title: "Notícias de Marte", 
      paragraph: "Ansioso por notícias? Entre no seu portal de notícias da Via Láctea!", 
      img: "../../../assets/images/mars-hover.jpeg", 
      imgAlt:"mars-hover.jpeg",
      className: "blog",
      callback: () => this.openNewTab('https://2no.co/exporion-blog'),
    }
  ]
  constructor(private router: Router) {}
  /**
   * Usado em qualquer botão, para redirecionar o usuário para 
   * alguma página fora do aplicativo por exemplo http://www.google.com
   * @param url Stirng contendo a url completa do site destino
   */
  public openNewTab(url: string): void {
    url.includes('/pages/mars-weather-panel') ? window.open(url, "_self") : window.open(url, '_blank') 
  }
}
