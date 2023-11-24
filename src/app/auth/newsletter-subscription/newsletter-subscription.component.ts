import { NewsletterAPI } from '../../core/api/newsletter.api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../app/core/services/modal.service';
import { NewsletterRequest } from '../../../app/core/models/INewsletterRequest';
import { NewsletterResponse } from '../../../app/core/models/INewsletterResponse';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class NewsletterSubscriptionComponent {
  public newsletterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private newsletterAPI: NewsletterAPI
  ) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Método responsável por lidar com o envio do formulário de newsletter.
   *
   * @returns {void}
   * @description
   * Este método primeiro define o indicador de carregamento como verdadeiro,
   * em seguida, faz uma chamada de API para enviar os dados da newsletter.
   * Após o envio bem-sucedido, exibe uma mensagem de sucesso modal.
   * Em caso de erro, exibe uma mensagem de erro modal.
   * Finalmente, redefine o indicador de carregamento como falso.
   *
   * @param {NewsletterRequest} newsletterForm.value - Dados da newsletter a serem enviados.
   */
  public onSubmit(): void {
    this.loaderService.setLoading(true);
    this.newsletterAPI
      .post<NewsletterRequest, NewsletterResponse>(this.newsletterForm.value)
      .then((response) => {
        this.modalService.showDialog({
          title: 'Sucesso',
          message: response.data.message,
          feedback: 'success',
        });
      })
      .catch((error) => {
        this.modalService.showDialog({
          title: 'Falha!',
          message: error,
          feedback: 'error',
        });
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}
