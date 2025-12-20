import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginCard, LoginData, ToastService } from '@ui-kit';

@Component({
  selector: 'app-login-sbx',
  imports: [LoginCard],
  template: ` <lib-login-card
    [formgroup]="formgroup"
    [data]="data"
    [extraActionTopLabel]="extraTopLabel"
    [extraActionBottomLabel]="extraBottomLabel"
    [extraActionTop]="extraActionTop"
    [extraActionBottom]="extraActionBottom"
    [action]="action"
    [inputFocusColor]="inputFocusColor"
  >
    <div class="flex items-center justify-center pt-5">
      @defer(){
      <img class="h-auto w-[18vw] rounded-lg" src="images/holo-graphic.jpg" alt="holo-graphic" />
      }@placeholder(){
      <div
        class="h-[38vh] border-3 border-gray-200 w-[18vw] rounded-lg bg-gray-200 animate-pulse"
      ></div>
      }
    </div>
  </lib-login-card>`,
  styleUrl: './login-sbx.css',
  host: {
    class: 'flex items-center justify-center',
  },
})
export class LoginSbx {
  toastService = inject(ToastService);
  formgroup: FormGroup = new FormGroup({});
  extraTopLabel = 'Sign Up';
  inputFocusColor = '#FAFDC6';
  extraBottomLabel = 'Forgot your Password?';
  data: LoginData = {
    input: {
      label: 'User',
      formControlName: 'username',
      placeholder: 'Enter your username',
    },
    password: {
      label: 'Password',
      formControlName: 'password',
      placeholder: 'Enter your password',
    },
  };

  extraActionTop = () => {
    console.log('extraActionTop');
  };

  extraActionBottom = () => {
    console.log('extraActionBottom');
  };

  constructor(fb: FormBuilder) {
    this.formgroup = fb.group({
      username: [''],
      password: [''],
    });
  }

  action = () => {
    console.log(this.formgroup.value);
  };
}
