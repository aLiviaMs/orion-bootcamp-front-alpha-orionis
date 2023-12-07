export interface IRegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
  isSubscribed: boolean;
}