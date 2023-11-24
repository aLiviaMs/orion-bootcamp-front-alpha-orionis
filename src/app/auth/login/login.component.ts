import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EnumStorageType } from 'src/app/core/common/enums/enum.storage.type.enum';
import { IResponseLogin } from 'src/app/core/models/IResponseLogin';
import { EmailService } from 'src/app/core/services/email.service';
import { AuthAPI } from '../../core/api/auth.api';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from './../../core/services/storage.service';
import { IRequestUserVerification } from 'src/app/core/models/IRequestUserVerification';
import { IRegisterResponse } from 'src/app/core/models/iRegisterResponse';
import { UserVerificationService } from 'src/app/core/api/user-verification.api';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hide = true;
  public errorMessage?: string;
  public loginForm: FormGroup;

  constructor(
    private authAPI: AuthAPI,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private emailService: EmailService,
    private userVerificationService: UserVerificationService,
    private modalService: ModalService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      isRememberEnabled: new FormControl(false),
    });
  }

  /**
   * Método do ciclo de vida chamado quando o componente é inicializado.
   * Chama o método que confirma o cadastro do usuario.
   */
  public ngOnInit(): void {
    this.confirmRegistration();
  }

  /**
   * Realiza o processo de login.
   * - Define o token de acordo com a opção de "Lembrar de mim".
   * - Navega para 'pages' em caso de sucesso.
   * - Exibe uma mensagem de erro em caso de falha.
   */
  public login(): void {
    this.loaderService.setLoading(true);
    this.authAPI
      .login(this.loginForm.value)
      .then((response: IResponseLogin) => {
        const storageType = this.loginForm.get('isRememberEnabled')?.value
          ? EnumStorageType.LOCAL
          : EnumStorageType.SESSION;
        this.storageService.setItem('token', response.data.token, storageType);
        this.router.navigate(['/pages']);
      })
      .catch((error) => {
        this.errorMessage = error;
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }

  /**
   * Método chamado quando o usuário clica em "Esqueceu a senha?".
   * - Obtém o valor do campo de e-mail do formulário.
   * - Armazena o valor do e-mail no serviço EmailService para uso posterior.
   * - Navega para a rota '/auth/password-reset' para permitir a redefinição da senha.
   */
  public forgotPassword(): void {
    this.emailService.setEmail(this.loginForm.get('email')?.value);
    this.router.navigate(['/auth/password-reset']);
  }

  /**
   * Realiza a confirmação de registro utilizando o token presente na URL.
   * Se o token estiver presente, faz uma requisição POST para confirmar o registro do usuário.
   * Em caso de sucesso, armazena o token na sessão e redireciona para a página home.
   * Em caso de falha, redireciona para a página de login, exibe uma caixa de diálogo de erro e encerra a exibição do carregamento.
   */
  public confirmRegistration(): void {
    const { token } = this.route.snapshot.params;
    if (token) {
      this.userVerificationService
        .post<IRequestUserVerification, IRegisterResponse>({ token })
        .then(() => {
          this.storageService.setItem('token', token, EnumStorageType.SESSION);
          this.router.navigate(['/pages']);
        })
        .catch((error) => {
          this.modalService.showDialog({
            title: 'Falha!',
            message: error,
            feedback: 'error',
          });
        });
    }
  }
}
