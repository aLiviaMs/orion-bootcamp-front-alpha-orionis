import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IWeatherCard } from 'src/app/core/models/IWeatherCard';
import SwiperCore, {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  SwiperOptions,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Pagination, Navigation, Scrollbar, A11y]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterViewInit {
  @Input() public weatherCards: IWeatherCard[] = [];

  /**
   * Configuração do Swiper
   *
   * Define as opções de configuração para o componente Swiper, que controla a exibição de slides.
   *
   * - slidesPerView: Define o número de slides visíveis por vez como 'auto'.
   * - spaceBetween: Define o espaço (em pixels) entre os slides.
   */
  public config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  @ViewChild(SwiperComponent) private swiperComponent?: SwiperComponent;

  /**
   * updateArrowVisibility
   *
   * Atualiza a visibilidade das setas de navegação com base na posição atual do Swiper.
   * As setas de navegação são ocultadas quando o início ou o fim do carrossel é alcançado.
   */
  public ngAfterViewInit(): void {
    this.updateArrowVisibility();
    this.swiperComponent?.swiperRef.on(
      'reachEnd',
      this.updateArrowVisibility.bind(this)
    );
    this.swiperComponent?.swiperRef.on(
      'slideChange',
      this.updateArrowVisibility.bind(this)
    );
  }

  /**
   * Atualiza a visibilidade das setas de navegação com base na posição do Swiper.
   * Verifica se o Swiper atingiu o início ou o final do carrossel para ajustar a visibilidade das setas.
   */
  private updateArrowVisibility(): void {
    const swiper = this.swiperComponent?.swiperRef;
    const arrowLeft = document.querySelector('.arrow-left') as HTMLElement;
    const arrowRight = document.querySelector('.arrow-right') as HTMLElement;

    arrowLeft.style.visibility = swiper?.isBeginning ? 'hidden' : 'visible';
    arrowRight.style.visibility = swiper?.isEnd ? 'hidden' : 'visible';
  }
}
