import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { IRequestNewPass } from 'src/app/core/models/request-password.reset';
import { IResponsePasswordReset } from 'src/app/core/models/response-password.reset';
import { ModalService } from 'src/app/core/services/modal.service';
import { ResetPasswordAPI } from '../../core/api/reset-password.api';
import { LoaderService } from '../../core/services/loader.service';
import { hasEnoughLetters, noSpaces, numbersValidation, specialLetterValidation, upperCaseValidation } from './customValidator/passMatch-Validator';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
  ],
})

export class NewPasswordComponent {
  public formNewPassword: FormGroup;
  public hideSecondPass = true;
  public specialCharTheme = '';
  public errorMessage = '';
  private resetToken = '';
  private userId = '';
  
  constructor(
    private activatedRouter: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private loaderService: LoaderService,
    private resetPassApi: ResetPasswordAPI,
    private modalService: ModalService
  ) {
    this.router = router;
    this.activatedRouter = activatedRouter;
    this.userId = this.activatedRouter.snapshot.params['id'];
    this.resetToken = this.activatedRouter.snapshot.params['reset-token'];

    this.formNewPassword = this.formBuilder.group({
      password: new FormControl(
        '',
        [
          noSpaces(),
          hasEnoughLetters(),
          specialLetterValidation(),
          upperCaseValidation(),
          numbersValidation(),
        ],
      ),
      passConfirmation: new FormControl('', []),
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(formNewPassword: FormGroup): void {
    const password: string = formNewPassword?.get('password')?.value;
    const passConfirmation: string = formNewPassword?.get('passConfirmation')?.value;

    if (password === passConfirmation) {
      formNewPassword.get('passConfirmation')?.setErrors(null);
    } else {
      formNewPassword.get('passConfirmation')?.setErrors({ passwordMismatch: true });
    }
  }

  protected goBack(): void{
    this.router.navigate(['/login']);
  }

  private createRequestJson(): IRequestNewPass {
    const password: string = this.formNewPassword?.get('password')?.value.replace(/\s/g, "");
    const passConfirmation: string = this.formNewPassword?.get('passConfirmation')?.value.replace(/\s/g, "");
    const userData: IRequestNewPass = {
      token: this.resetToken, 
      id: parseInt(this.userId),
      password,
      confirmPassword: passConfirmation,
    }
    return userData;
  }

  protected newPassBtnRequest(): void{
    const userData = this.createRequestJson();
    this.loaderService.setLoading(true);
    this.resetPassApi
      .passwordReset(userData)
        .then((response: IResponsePasswordReset) => {
          this.modalService.showSuccessDialog(response.data.message)
      })
      .catch((error) => {
        this.errorMessage = error;
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }

}