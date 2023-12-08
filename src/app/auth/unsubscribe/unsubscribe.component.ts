import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { NewsletterAPI } from "src/app/core/api/newsletter.api";
import { NewsletterResponse } from "src/app/core/models/INewsletterResponse";
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
})

export class UnsubscribeComponent implements OnInit {
  constructor(
    private newsLetterAPI: NewsletterAPI,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private modalService: ModalService,
  ) {
  }
  
  /**
   * Ao iniciar a pagina, faz a requisicao de desinscricao da newsletter
   * Em caso de falhar chama o modal de falha
   * Em caso de sucesso chama o modal de sucesso 
   */
  public ngOnInit(): void {
    const { token } = this.activatedRoute.snapshot.params;
    this.unsubNewsletter(token);
  }

  /**
   * Callback para ser passada para o modal
   * Ao passar para o modal o click no botao de finalizar no modal
   * redireciona o usuario para a tela de login
   */
  public goBack(): void {
    this.router.navigate(['/login']);
  }
  /**
   * Chama o loading, faz uma requisicao GET para a rota /unsubscribe/:token
   * Chama o modal com a resposta da requisicao em caso de sucesso ou falha
   * E redireciona o usuario para a tela de /login
   * @param token O token que sera usado para se desinscrever da newsletter
   */
  public unsubNewsletter(token: string): void {
    this.loaderService.setLoading(true);
    this.newsLetterAPI
      .unsubscribe(token)
      .then((response: NewsletterResponse) => {
        this.modalService.showDialog({
          title: 'Sucesso',
          message: response.data.message,
          feedback: 'success',
        })
        .afterClosed()
        .subscribe(() => {
          this.goBack();
        });
      })
      .catch((error) => {
        this.modalService.showDialog({
          title: 'Falha!',
          message: error,
          feedback: 'error',
        })
        .afterClosed()
        .subscribe(() => {
          this.goBack();
        });
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}