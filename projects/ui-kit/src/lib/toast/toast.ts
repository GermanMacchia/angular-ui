import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'lib-toast',
  template: `
    @if (visible()) {
    <div
      role="alert"
      class="z-[5000] gm-lib-toast-width alert alert-soft toast toast-top toast-center"
      [class]="service.data.severity"
    >
      <i [class]="service.data.icon" style="font-size: 1.75rem;"></i>
      <div class="flex flex-col gap-2 gm-lib-toast-width w-full">
        @if (service.data.title) {
        <p class="font-semibold text-xl w-full">
          {{ service.data.title }}
        </p>
        }
        <p class="whitespace-pre-wrap text-lg font-medium w-full">
          <!-- prettier-ignore -->{{service.data.body}}
        </p>
      </div>
    </div>
    }
  `,
})
export class Toast implements OnInit {
  service = inject(ToastService);
  visible = signal<boolean>(false);

  ngOnInit(): void {
    this.service.thrigger.subscribe(() => this.show());
  }

  show() {
    this.visible.set(true);
    setTimeout(() => this.visible.set(false), this.service.data.duration);
  }
}
