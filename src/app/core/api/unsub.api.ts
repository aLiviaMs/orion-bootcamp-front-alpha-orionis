import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsletterResponse } from '../models/INewsletterResponse';
import { StorageService } from '../services/storage.service';
import { BaseAPI } from './base.api';

@Injectable({
  providedIn: 'root',
})

export class NewsLetterUnsubscribeAPI extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/newsletter/unsubscribe/:token';
  }

  /**
   * Solicita o cancelamento da newsletter
   *
   * @param token O token para a desinscricao.
   * @returns Uma Promise com a resposta da solicitação de redefinição de senha.
   */
  public async unsubscribe(
    token: string
  ): Promise<NewsletterResponse> {
    return this.get(token);
  }
}
