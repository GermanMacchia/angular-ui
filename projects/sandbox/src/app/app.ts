import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Drawer, Toast, ToastData, ToastService } from '@ui-kit';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Drawer, RouterLink, Toast],
  providers: [ToastService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private translocoService = inject(TranslocoService);
  private toastService = inject(ToastService);

  handleLogout = () => {
    const data: ToastData = {
      body: 'Logout success',
      severity: 'success',
      icon: 'bi bi-box-arrow-left',
    };
    this.toastService.toast(data);
  };

  sidebarOpen = (isOpen: string) =>
    isOpen
      ? document.getElementById('main-router')?.classList.remove('router-shell')
      : document.getElementById('main-router')?.classList.add('router-shell');

  toggleLanguage = () => {
    const currentLang = this.translocoService.getActiveLang();
    const newLang = currentLang === 'en' ? 'es' : 'en';
    this.translocoService.setActiveLang(newLang);
  };

  callAToast = () =>
    this.translocoService
      .selectTranslate('toast.test')
      .pipe(take(1))
      .subscribe((message: string) => {
        const dataToast: ToastData = {
          body: message,
          severity: 'info',
          duration: 10000,
        };
        this.toastService.toast(dataToast);
      });

  sidebarInfo = () =>
    this.translocoService
      .selectTranslate('toast.sidebar')
      .pipe(take(1))
      .subscribe((message: string) => {
        const dataToast: ToastData = {
          body: message,
          severity: 'info',
          icon: 'bi bi-exclamation-circle',
          duration: 10000,
        };
        this.toastService.toast(dataToast);
      });
}
