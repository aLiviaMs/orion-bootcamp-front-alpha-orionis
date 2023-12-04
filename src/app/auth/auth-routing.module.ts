import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/:token',
    component: LoginComponent,
  },
  {
    path: 'reset-password/:id/:reset-token',
    component: NewPasswordComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'newsletter-subscription',
    component: NewsletterSubscriptionComponent,
  },
  {
    path: 'newsletter/unsubscribe/:token',
    component: UnsubscribeComponent,
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
