import { Injectable } from '@angular/core';
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserVerificationService extends BaseAPI {
  constructor(httpClient: HttpClient, storageService: StorageService) {
    super(httpClient, storageService);
    this.apiUrl += '/user-verification';
  }
}
