import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EnumVariation } from 'src/app/core/common/enums/enum.variation';
import { IWeatherCard } from '../../../core/models/IWeatherCard';

@Component({
  selector: 'app-card-principal',
  templateUrl: './card-principal.component.html',
  styleUrls: ['./card-principal.component.scss'],
})
export class CardPrincipalComponent {
  @Input() public weatherCard!: IWeatherCard;
  public tempSelection = true;
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Retorna um elemento SVG que representa a variação de temperatura (seta para cima ou para baixo) com base no tipo de temperatura (máxima ou mínima).
   *
   * @param temperature Tipo de temperatura ('max' para temperatura máxima, 'min' para temperatura mínima).
   * @returns Um elemento SafeHtml contendo o código SVG para a variação de temperatura.
   */
  public getTemperature(temperature: 'max' | 'min'): SafeHtml {
    const currentVariation =
      temperature === 'max'
        ? this.weatherCard.temperature.celsius.max.variation
        : this.weatherCard.temperature.celsius.min.variation;

    if (currentVariation === EnumVariation.NEUTRAL) {
      return '';
    }

    const rotation =
      currentVariation === EnumVariation.HIGHER
        ? 'rotate(180 8.5 5.5)'
        : 'rotate(0 8.5 5.5';

    const fill =
      currentVariation !== EnumVariation.HIGHER ? '#A3FCB6' : '#FF7474';

    const height = currentVariation !== EnumVariation.HIGHER ? '35px' : '17px';
    const width = currentVariation !== EnumVariation.HIGHER ? '25px' : '17px';

    const svgElement = `<svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      style="width: ${width}; height: ${height}; margin-left: 5px; "
      xmlns="http://www.w3.org/2000/svg"
    >
    <g id="caret-down-outline 1" transform="translate(1.5, 4.5) ${rotation}">
    <path
          id="Vector"
          d="M3.44535 6.68183L8.35949 12.4165C8.4387 12.5089 8.53696 12.5831 8.64753 12.6339C8.75809 12.6848 8.87834 12.7111 9.00004 12.7111C9.12173 12.7111 9.24199 12.6848 9.35255 12.6339C9.46312 12.5831 9.56138 12.5089 9.64059 12.4165L14.5547 6.68183C15.0237 6.13445 14.6349 5.28894 13.9142 5.28894H4.08449C3.36379 5.28894 2.97496 6.13445 3.44535 6.68183Z"
          fill="${fill}"
        />
      </g>
    </svg>`;

    return this.sanitizer.bypassSecurityTrustHtml(svgElement);
  }

  /**
   * Usado para trocar as escalas de  temperaturas
   * True sera usado para escala em Celsius
   * False sera usado para escala em Farhenheit
   */
  public onClick():void {
    event?.preventDefault();
    this.tempSelection = !this.tempSelection
  }
}
