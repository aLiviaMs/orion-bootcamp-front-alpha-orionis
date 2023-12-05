import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHomeCard } from 'src/app/core/models/iHomeCard';

@Component({
    selector: 'app-card-home',
    templateUrl: './card-home.component.html',
    styleUrls: ['./card-home.component.scss'],
    animations: [
      trigger('colorChange', [
        state('initial', style({
          color: "#FFFFFF",
          backgroundColor: "#ba8e73"
        })),
        state('final', style({
          color: "#979797",
          backgroundColor: '#EEC19B'
        })),
        transition('initial => final', animate('500ms ease-in')),
        transition('final => initial', animate('500ms ease-out'))
      ]),
    ]
})

export class CardHomeComponent {
    @Input() card!: IHomeCard;
    @Output() public buttonClick: EventEmitter<void> = new EventEmitter<void>();
    public buttonState = 'initial';
    public imgState = 'initial';

    /**
     * Serve para modificar o estado da animação de cores do botão
     * Inicial com a cor primary-500 e final com a cor primary-300
     */
    toggleColor(): void {
      this.buttonState = (this.buttonState === 'initial') ? 'final' : 'initial';
    }
    
    /**
     * Passada para o botão onde o usuário será direcionado para 
     * a página de weather ou para a comunidade ou para o blog
     * dependende de qual card chamar a função
     * @param event Receb o tipo de evento vindo do botão
     */
    public onClick(event: Event): void {
      event.preventDefault();
      this.card?.callback('');
    }
}
