import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeesComponent {
  token = signal<string>(
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLWlkIjoiMDE5NWEwODYtZGY5Zi03NDMyLWJiN2ItOWExMTgxY2NkMzg2IiwibmJmIjoxNzQ1NDUwMDg2LCJleHAiOjE3NDU1MzY0ODYsImlzcyI6Ik1laG1ldCBDYW4gxZ5pbcWfZWsiLCJhdWQiOiJNZWhtZXQgQ2FuIMWeaW3Fn2VrIn0.gCh34Gh8_oXG9YoF04KqBixBlfXNKVgVzk2hDhjK7Ysq-krkUKXIoBa8QMJVr0T33Xh_cFzDFHV66YgTdrP5Ww'
  );

  result = resource({
    loader: async () => {
      var res = await lastValueFrom(
        this.#http.get<ODataModel<any[]>>(
          'https://localhost:7166/odata/employees?$count=true',
          {
            headers: { Authorization: 'bearer ' + this.token() },
          }
        )
      );
      return res;
    },
  });

  data = computed(() => this.result.value()?.value);
  total = computed(() => this.result.value()?.['@odata.count']);
  loading = computed(() => this.result.isLoading());

  #http = inject(HttpClient);
}
