import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Drawer } from '@ui-kit';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Drawer, RouterLink],
  templateUrl: './app.html',
})
export class App {
  private translocoService = inject(TranslocoService);

  handleLogout = () => {
    console.log('logout');
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
}
