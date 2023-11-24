import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/app/environments/environment';

export class BaseAPI {
  protected apiUrl: string = environment.apiUrl;

  constructor(
    protected httpClient: HttpClient,
    protected storageService: StorageService
  ) {}

  public setHeaders(): HttpHeaders['headers'] {
    const bearerToken = this.storageService.getItem('token');

    const headers: HttpHeaders['headers'] = {
      language: 'pt-br',
      ...(bearerToken && { authorization: `Bearer ${bearerToken}` }),
      'Content-Type': 'application/json',
    };

    return headers;
  }

  /**
   * Realiza uma requisição HTTP GET para a URL da API.
   * @param params String contendo alguns parametros caso necessário para rotas GET
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  public get<TR>(params = ''): Promise<TR> {
    const headers = this.setHeaders();
    return new Promise<TR>((resolve, reject) => {
      this.httpClient.get<TR>(this.apiUrl + params, { headers }).subscribe(
        (response: TR) => {
          resolve(response);
        },
        (error) => {
          reject(`${error.error.data?.message || 'Ocorreu um erro na comunicação com o servidor. Tente novamente.'}`);
        }
      );
    });
  }

  /**
   * Realiza uma requisição HTTP POST para a URL da API.
   *
   * @param data Os dados a serem enviados na requisição.
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  public post<TD, TR>(data: TD): Promise<TR> {
    const headers = this.setHeaders();

    return new Promise<TR>((resolve, reject) => {
      this.httpClient.post<TR>(this.apiUrl, data, { headers }).subscribe(
        (response: TR) => {
          resolve(response);
        },
        (error) => {
          reject(
            error.error && error.error.data && error.error.data.message
              ? error.error.data.message
              : error.error && error.error.message
              ? error.error.message
              : 'Ocorreu um erro na comunicação com o servidor. Tente novamente.'
          );
        }
      );
    });
  }
}
