import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-home-sbx',
  standalone: true,
  imports: [TranslocoDirective],
  template: `
    <div *transloco="let t" class="flex flex-col items-center justify-start h-full p-8 text-center">
      <h1 class="text-4xl font-bold mb-4">{{ t('welcomeTitle') }}</h1>
      <p class="text-lg text-base-content/70 whitespace-pre-wrap ">
        <!-- prettier-ignore -->{{t('welcomeMessage')}}
      </p>
    </div>
  `,
  host: {
    class: 'block w-full h-full',
  },
})
export class HomeSbx {}
