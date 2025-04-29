import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  ViewEncapsulation,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';
import { RouterLink } from '@angular/router';
import { api } from '../../constants';
import { EmployeeModel } from '../../models/employee.model';
import { FlexiToastService } from 'flexi-toast';
import { ResultModel } from '../../models/result.model';

@Component({
  imports: [CommonModule, BlankComponent, RouterLink],
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeesComponent {
  result = resource({
    loader: async () => {
      let endpoint = `${api}/odata/employees?$count=true`;
      var res = await lastValueFrom(
        this.#http.get<ODataModel<any[]>>(endpoint)
      );
      return res;
    },
  });

  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = linkedSignal(() => this.result.isLoading());

  #http = inject(HttpClient);
  #breadcrumb = inject(BreadcrumbService);
  #toast = inject(FlexiToastService);

  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add('Çalışanlar', '/employees', 'person_apron');
  }

  delete(item: EmployeeModel) {
    const endpoint = `${api}/employees/${item.id}`;
    this.#toast.showSwal(
      'Çalışanı Sil?',
      `Çalışanı silmek istiyor musunuz? Ad Soyad: ${item.firstName} ${item.lastName}`,
      'Evet, Sil',
      () => {
        this.loading.set(true);
        this.#http.delete<ResultModel<string>>(endpoint).subscribe((res) => {
          this.#toast.showToast('Bilgilendirme', res.data!, 'info');
          this.result.reload();
        });
      },
      'Hayır, Vazgeç'
    );
  }
}
