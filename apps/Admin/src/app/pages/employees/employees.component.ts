import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  ViewEncapsulation,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';

@Component({
  imports: [CommonModule, BlankComponent],
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeesComponent {
  result = resource({
    loader: async () => {
      let endpoint = 'https://localhost:7166/odata/employees?$count=true';
      var res = await lastValueFrom(
        this.#http.get<ODataModel<any[]>>(endpoint)
      );
      return res;
    },
  });

  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = computed(() => this.result.isLoading());

  #http = inject(HttpClient);
  #breadcrumb = inject(BreadcrumbService);

  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add('Çalışanlar', '/employees', 'person_apron');
  }
}
