import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NewsletterResponse } from '../models/INewsletterResponse';
import { StorageService } from '../services/storage.service';
import { BaseAPI } from './base.api';

@Injectable({ providedIn: 'root' })
export class NewsletterAPI extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/newsletter';
  }

  /**
   * Faz um request GET pela BaseAPI
   * Passa um complemento de URL para a funcao get da BaseAPI
   * Completando o que falta para fazer a requisicao de unsubscribe
   * Que e /unsubscribe//:token
   * @param token Token de validacao que vem do back por email dentro da newsletter
   * @returns Uma promisse contendo os dados a serem recebidos do back
   */
  public async unsubscribe(
    token: string
  ): Promise<NewsletterResponse> {
    return this.get("/unsubscribe/" + token);
  }
}
