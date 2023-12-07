import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { IRegisterRequestBody } from 'src/app/core/models/iRegisterRequest';
import { IRegisterResponse } from 'src/app/core/models/iRegisterResponse';
import { ModalService } from 'src/app/core/services/modal.service';
import { LoaderService } from '../../core/services/loader.service';
import {
  hasEnoughLetters,
  noSpaces,
  numbersValidation,
  specialLetterValidation,
  upperCaseValidation,
} from '../new-password/customValidator/passMatch-Validator';
import { NewUserAPI } from 'src/app/core/api/new-user.api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatIconModule,
  ],
})
export class SignUpComponent {
  public formNewUser: FormGroup;
  public hideFirstPass = true;
  public hideSecondPass = true;
  public specialCharTheme = '';

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private modalService: ModalService,
    private newUserAPI: NewUserAPI,
    private router: Router
  ) {
    this.formNewUser = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          noSpaces('password'),
          hasEnoughLetters('password'),
          specialLetterValidation('password'),
          upperCaseValidation('password'),
          numbersValidation('password'),
        ]),
        passConfirmation: new FormControl('', [
          noSpaces('passConfirmation'),
          hasEnoughLetters('passConfirmation'),
          specialLetterValidation('passConfirmation'),
          upperCaseValidation('passConfirmation'),
          numbersValidation('passConfirmation'),
        ]),
        isNewsletterEnabled: new FormControl(true),
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  /**
   * Responsável por validar se ambos os campos de input, contém a mesma senha
   * @param formNewUser Formulário contendo todos dados sobre os inputs de senhas
   * @returns Um erro que é adicionado ao formGroup ou null
   */
  private passwordMatchValidator(
    formNewUser: FormGroup
  ): { [key: string]: boolean } | null {
    const password: string = formNewUser?.get('password')?.value;
    const passConfirmation: string =
      formNewUser?.get('passConfirmation')?.value;
    return password === passConfirmation && password !== ''
      ? null
      : { passMissMatch: true };
  }

  /**
   * Responsável por montar o objeto que irá conter todos os dados para fazer
   * uma requisição na rota post /sign-up no backend
   * @returns Um json contendo todos os dados para fazer requisição post na rota /sign-up
   */
  private createRequestJson(): IRegisterRequestBody {
    const email: string = this.formNewUser
      ?.get('email')
      ?.value.replace(/\s/g, '');
    const password: string = this.formNewUser
      ?.get('password')
      ?.value.replace(/\s/g, '');
    const confirmPassword: string = this.formNewUser
      ?.get('passConfirmation')
      ?.value.replace(/\s/g, '');
    const newsletterCheckbox =
      this.formNewUser?.get('isNewsletterEnabled')?.value || false;
    const userData: IRegisterRequestBody = {
      email,
      password,
      confirmPassword,
      isSubscribed: newsletterCheckbox,
    };
    return userData;
  }

  /**
   * Responsável por enviar o request com um JSON do tipo IRegisterRequest
   * Que contem, email(string), password(string), confirmPassword(string) e isSubscribed(bool)
   */
  protected newUserBtnRequest(): void {
    const userData = this.createRequestJson();
    this.loaderService.setLoading(true);
    this.newUserAPI
      .post<IRegisterRequestBody, IRegisterResponse>(userData)
      .then((response) => {
        this.modalService.showDialog({
          title: 'Sucesso',
          message: response.data.message,
          feedback: 'success',
        });
        this.router.navigate(['/login']);
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
