import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  /**
   * Efetua o logout do usuário, redirecionando para a página de login e removendo o token de autenticação.
   * Também lida com o indicador de carregamento.
   */
  public logout(): void {
    this.loaderService.setLoading(true);
    this.router.navigate(['auth/login']);
    this.storageService.removeItem('token');
    this.loaderService.setLoading(false);
  }

  /**
   * Lida com eventos de teclado (Enter ou Espaço) para efetuar o logout quando uma tecla é pressionada.
   * @param event O evento de teclado gerado pelo usuário.
   */
  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.logout();
    }
  }
}
