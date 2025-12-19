import { TitleCasePipe } from '@angular/common';
import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

export const theme_value = 'theme_value';
type BreadCrumb = { label: string; url: string };

@Component({
  selector: 'lib-drawer',
  imports: [TitleCasePipe, RouterLink, FormsModule],
  templateUrl: './drawer.html',
})
export class Drawer implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  logout = input.required<() => void>();
  usuario = input<string>();
  rol = input<string>();
  themeCheck = false;
  items = input<
    {
      label: string;
      routerLink: string;
      icon: string;
      only?: string;
      except?: string;
    }[]
  >();
  themes = input.required<{ dark: string; light: string }>();
  appname = input<string>();
  paths = signal<{ label: string; url: string }[]>([]);
  hideOnRoute = input(false);
  bookmarks = signal<string[]>([]);

  open = model<string>('drawer-open');
  toggleDrawer = () => this.open.update((open) => (open ? '' : 'drawer-open'));

  ngOnInit(): void {
    this.checkTheme();
    this.setBookmarks();
    this.buildBreadCrumb(this.activatedRoute.root);
    this.subscribePaths();
  }

  back = () => {
    const items = this.paths();
    items.pop();
    this.router.navigate([items.pop()?.url]);
  };

  addBookmark = () => {
    const url = this.router.url;

    if (url === '/') return;

    const bookmarks = localStorage.getItem('bookmarks');
    const key: string = `${this.usuario()}.${this.rol()}`;

    if (!bookmarks) {
      const data: Record<string, Array<string>> = { [key]: [url] };
      localStorage.setItem('bookmarks', JSON.stringify(data));
      this.setBookmarks();
      return;
    }

    const data: Record<string, Array<string>> = JSON.parse(bookmarks);
    data[key] = [...data?.[key], url];

    localStorage.setItem('bookmarks', JSON.stringify(data));
    this.setBookmarks();
  };

  removeBookmark = (url: string, event: any) => {
    event.stopPropagation();

    const bookmarks = localStorage.getItem('bookmarks');
    const key: string = `${this.usuario()}.${this.rol()}`;

    if (!bookmarks) return;

    const data: Record<string, Array<string>> = JSON.parse(bookmarks);
    data[key] = data[key]?.filter((ele) => ele !== url);

    localStorage.setItem('bookmarks', JSON.stringify(data));
    this.setBookmarks();
  };

  changeTheme = () => {
    const html = document.getElementsByTagName('html')[0];

    const theme = html.getAttribute('data-theme');
    const swithed = theme === this.themes().light ? this.themes().dark : this.themes().light;

    document.getElementsByTagName('html')[0].setAttribute('data-theme', swithed);
    localStorage.setItem(theme_value, swithed);
  };

  private checkTheme() {
    const theme = localStorage.getItem(theme_value);

    if (!theme || theme === this.themes().light) return;

    document.getElementsByTagName('html')[0].setAttribute('data-theme', this.themes().dark);

    this.themeCheck = true;
  }

  private setBookmarks() {
    const bookmarks = localStorage.getItem('bookmarks');
    const key: string = `${this.usuario()}.${this.rol()}`;

    if (!bookmarks) return;
    const data: Record<string, Array<string>> = JSON.parse(bookmarks);
    const userBookmarks: string[] = data[key];
    this.bookmarks.set(userBookmarks);
  }

  private subscribePaths() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.buildBreadCrumb(this.activatedRoute.root));
  }

  private buildBreadCrumb(
    activatedRoute: ActivatedRoute,
    url: string = '',
    breadcumbs: BreadCrumb[] = [{ label: 'Inicio', url: '' }]
  ): void {
    for (let idx = 0; idx < activatedRoute.children.length; idx++) {
      const snapshot = activatedRoute.children[idx].snapshot;
      const routeUrl = snapshot.url.map((segment) => segment.path).join('/');

      if (routeUrl) {
        url += `/${routeUrl}`;
        breadcumbs.push({ label: routeUrl, url: url });
      }

      return this.buildBreadCrumb(activatedRoute.children[idx], url, breadcumbs);
    }

    this.paths.set(breadcumbs);
  }
}
