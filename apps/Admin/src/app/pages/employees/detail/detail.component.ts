import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ResultModel } from '../../../models/result.model';
import { EmployeeModel } from '../../../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../constants';
import BlankComponent from '../../../components/blank/blank.component';
import { c } from '@angular/core/navigation_types.d-u4EOrrdZ';

@Component({
  imports: [BlankComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailComponent {
  readonly id = signal<string>('');
  readonly data = computed(() => this.result.value());

  readonly result = resource({
    request: () => this.id(),
    loader: async ({ request }) => {
      if (this.id()) {
        const res = await lastValueFrom(
          this.#http.get<ResultModel<any>>(`${api}/employees/${this.id()}`)
        );

        const data = res.data;

        const mappedEmployee: EmployeeModel = {
          ...data,
          personnelInformation: {
            identityNumber: data.identityNumber ?? '',
            email: data.email ?? '',
            phone1: data.phone1 ?? '',
            phone2: data.phone2 ?? '',
          },
        };
        console.log(mappedEmployee);
        
        return mappedEmployee;
      }

      return undefined;
    },
  });

  readonly #breadcrumb = inject(BreadcrumbService);
  readonly #activated = inject(ActivatedRoute);
  readonly #http = inject(HttpClient);

  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add('Çalışanlar', '/employees', 'person_apron');
    this.#breadcrumb.add('Çalışan Detay', '/employees/detail', 'zoom_in');

    this.#activated.params.subscribe((res) => {
      this.id.set(res['id']);
    });
  }
}
