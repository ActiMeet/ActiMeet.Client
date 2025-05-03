import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlexiButtonComponent } from 'flexi-button';
import { ResultModel } from '../../models/result.model';
import { api } from '../../constants';
import { FlexiToastService } from 'flexi-toast';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [RouterLink, FormsModule, FlexiButtonComponent],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  readonly request = signal<{ userNameOrEmail: string; password: string }>({
    userNameOrEmail: '',
    password: '',
  });
  readonly loading = signal<boolean>(false);

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #auth = inject(AuthService);

  login() {
    if (this.loading()) return;

    this.loading.set(true);

    this.#http
      .post<ResultModel<any>>(`${api}/auth/login`, this.request())
      .subscribe({
        next: (res) => {
          if (!res.isSuccessful || !res.data) {
            console.log(res.errorMessages?.[0], 'a');
            this.#toast.showToast(
              'Hata!',
              res.errorMessages?.[0] || 'Giriş başarısız',
              'error'
            );
            return;
          }

          localStorage.setItem('accessToken', res.data.accessToken);
          this.#auth.setUser(this.request().userNameOrEmail);

          this.#toast.showToast(
            'Başarılı',
            `Hoşgeldin, ${this.request().userNameOrEmail}`,
            'success'
          );
          this.#router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          const errorMsg = err.error?.errorMessages?.[0] || 'Sunucu hatası';
          console.log(errorMsg, 'b');
          this.#toast.showToast('Hata!', errorMsg, 'error');
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }
}
