import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
})

export class UnsubscribeComponent {
    public formUnsubscribe: FormGroup;
    public errorMessage = '';
    
    constructor(
      private formBuilder: FormBuilder, 
      //private loaderService: LoaderService,
      //private modalService: ModalService,
      //private newUserAPI: NewUserAPI,
    ) {
  
      this.formUnsubscribe = this.formBuilder.group({
        nome: new FormControl(
            '',
            [Validators.required, Validators.min(6)]
        ),
        email: new FormControl(
          '',
          [Validators.required, Validators.email]
        ),
        reasonInput: new FormControl(
            '',
            [Validators.required, Validators.min(10), Validators.max(100)]
        ),
        feedbackInput: new FormControl(
            '',
            [Validators.required, Validators.min(10), Validators.max(100)]
        ),
      }, {
      });
    }

    private createRequest() {
        const nome: string = this.formUnsubscribe?.get('nome')?.value
        const email: string = this.formUnsubscribe?.get('email')?.value
        const reasonInput: string = this.formUnsubscribe?.get('reasonInput')?.value
        const feedbackInput: string = this.formUnsubscribe?.get('feedbackInput')?.value

        const userData = {
            nome,
            email,
            reasonInput,
            feedbackInput,
        }
        return userData;
    }

    protected unsubBtn() {
        const userData = this.createRequest();
        console.log(userData);
    }
}