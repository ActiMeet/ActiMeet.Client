import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
  breadcrumbs = computed(() => this.#breadcrumb.data());
  time = signal<string>('');
  user = signal<string>('');

  #breadcrumb = inject(BreadcrumbService);
  #date = inject(DatePipe);
  #router = inject(Router);
  #auth = inject(AuthService);

  constructor() {
    setInterval(() => {
      this.time.set(this.#date.transform(new Date(), 'dd.MM.yyyy HH:mm:ss')!);
    }, 1000);

    this.user.set(this.#auth.getUser());
  }

  logout() {
    localStorage.clear();
    this.#router.navigateByUrl('/login');
  }
}
