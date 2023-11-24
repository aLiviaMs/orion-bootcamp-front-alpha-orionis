import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

import { ForgotPasswordAPI } from 'src/app/core/api/forgot-password.api';
import { IResponsePasswordForgot } from 'src/app/core/models/IResponsePasswordForgot';
import { EmailService } from 'src/app/core/services/email.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterModule,
  ],
})
export class PasswordResetComponent implements OnInit {
  public emailForm: FormGroup;
  public email!: string;

  constructor(
    private forgotPasswordAPI: ForgotPasswordAPI,
    private router: Router,
    private loaderService: LoaderService,
    private modalService: ModalService,
    private emailService: EmailService
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa o formulário, preenchendo o campo de e-mail com o valor armazenado no serviço EmailService.
   */
  private initializeForm(): void {
    const storedEmail = this.emailService.getEmail();
    if (storedEmail) {
      this.emailForm.patchValue({ email: storedEmail });
    }
  }

  /**
   * Navega de volta para a página de login.
   */
  public goBack(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Manipula o envio do formulário de redefinição de senha.
   * Este método chama a API de redefinição de senha e exibe um diálogo de sucesso ou captura erros.
   */
  public onSubmit(): void {
    this.loaderService.setLoading(true);
    this.forgotPasswordAPI
      .passwordReset(this.emailForm.value.email)
      .then((response: IResponsePasswordForgot) => {
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
