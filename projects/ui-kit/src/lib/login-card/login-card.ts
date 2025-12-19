import { Component, input } from '@angular/core';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';

export type LoginInfo = {
  label: string;
  formControlName: string;
  placeholder: string;
};
export type LoginData = { input: LoginInfo; password: LoginInfo };

@Component({
  selector: 'lib-login-card',
  imports: [ReactiveFormsModule],
  templateUrl: './login-card.html',
  styles: `
		:host ::ng-deep .input:focus, .input:focus-within {
			outline: none;
      border-color: var(--input-focus-color, aliceblue);
		}
    
		:host ::ng-deep .card-body {
			gap: 0;
			padding-top: 0;
		}
	`,
  host: {
    '[style.--input-focus-color]': 'inputFocusColor()',
  },
})
export class LoginCard {
  inputFocusColor = input<string>('aliceblue');
  loading = input<boolean>(false);
  formgroup = input.required<FormGroup>();
  data = input.required<LoginData>();
  action = input.required<() => void>();
  actionLabel = input<string>('Login');
  extraActionTop = input<(() => void) | null>(null);
  extraActionBottom = input<(() => void) | null>(null);
  extraActionTopLabel = input<string>('');
  extraActionBottomLabel = input<string>('');
}
