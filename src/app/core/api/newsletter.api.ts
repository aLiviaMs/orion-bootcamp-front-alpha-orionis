import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseAPI } from './base.api';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class NewsletterAPI extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/newsletter';
  }
}
