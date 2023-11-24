import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NewPasswordComponent,
    PasswordResetComponent,
    MatInputModule,
    SignUpComponent,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SignUpComponent,
    NewsletterSubscriptionComponent,
  ],
})
export class AuthModule {}
