import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { NewsLetterUnsubscribeAPI } from "src/app/core/api/unsub.api";
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
    private newsLetterUnsubscribeAPI: NewsLetterUnsubscribeAPI,
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
    this.newsLetterUnsubscribeAPI
      .unsubscribe(token)
      .then((response: NewsletterResponse) => {
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