import { IWeatherResponse } from './../../core/models/IWeatherResponse';
import { Component, OnInit } from '@angular/core';
import { IWeatherCard } from 'src/app/core/models/IWeatherCard';
import { LoaderService } from 'src/app/core/services/loader.service';
import { WeatherAPIService } from 'src/app/core/api/weather.api';
import { ModalService } from 'src/app/core/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mars-weather-panel',
  templateUrl: './mars-weather-panel.component.html',
  styleUrls: ['./mars-weather-panel.component.scss'],
})
export class MarsWeatherPanelComponent implements OnInit {
  public weatherCards: IWeatherCard[] = [];

  constructor(
    private weatherAPIService: WeatherAPIService,
    private loaderService: LoaderService,
    private ModalService: ModalService,
    private router: Router
  ) {}

  /**
   * ngOnInit
   *
   * Método do ciclo de vida do Angular chamado após a inicialização do componente.
   * Este método é usado para iniciar a obtenção de dados de temperatura quando o componente é carregado.
   */
  public ngOnInit(): void {
    this.getTemperatureData();
  }

  /**
   * Navega de volta para a página home.
   */
  public goBack(): void {
    this.router.navigate(['pages/home']);
  }

  /**
   * getTemperatureData
   *
   * Inicia o processo de obtenção de dados de temperatura, exibindo um indicador de carregamento enquanto
   * os dados estão sendo recuperados.
   */
  public getTemperatureData(): void {
    this.loaderService.setLoading(true);
    this.weatherAPIService
      .get<IWeatherResponse>()
      .then((response) => {
        if (response && response.status === true && response.data) {
          this.weatherCards = response.data.weatherCards;
          this.weatherCards.reverse();
        }
      })
      .catch((error) => {
        this.ModalService.showDialog({
          title: 'Falha',
          message: error,
          feedback: 'error',
        });
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
