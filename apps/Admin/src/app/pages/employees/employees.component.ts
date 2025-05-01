import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { lastValueFrom, timeInterval } from 'rxjs';
import { ODataModel } from '../../models/odata.model';
import { CommonModule, Location } from '@angular/common';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import BlankComponent from '../../components/blank/blank.component';
import { RouterLink } from '@angular/router';
import { api } from '../../constants';
import { EmployeeModel } from '../../models/employee.model';
import { FlexiToastService } from 'flexi-toast';
import { ResultModel } from '../../models/result.model';
import { FlexiGridModule } from 'flexi-grid';
import { FlexiButtonComponent } from 'flexi-button';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    BlankComponent,
    RouterLink,
    FlexiGridModule,
    CommonModule,
    FlexiButtonComponent,
    FormsModule,
  ],
  templateUrl: './employees.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeesComponent {
  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add('Çalışanlar', '/employees', 'person_apron');
  }

  readonly data = computed(() => this.result.value()?.value ?? []);
  readonly total = computed(() => this.result.value()?.['@odata.count'] ?? 0);
  readonly loading = linkedSignal(() => this.result.isLoading());
  readonly selectedEmployee = computed(() => this.getEmployeeResult?.value());
  readonly selectedEmployeeId = signal<string>('');

  readonly #http = inject(HttpClient);
  readonly #breadcrumb = inject(BreadcrumbService);
  readonly #toast = inject(FlexiToastService);
  readonly #location = inject(Location);

  readonly result = resource({
    loader: async () => {
      let endpoint = `${api}/odata/employees?$count=true`;
      var res = await lastValueFrom(
        this.#http.get<ODataModel<any[]>>(endpoint)
      );
      return res;
    },
  });

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

  getSalaryTotal() {
    const salaries = this.data().map((x) => x.salary);
    let total = 0;
    salaries.forEach((x) => (total += x));
    return total;
  }

  readonly getEmployeeResult = resource({
    loader: async () => {
      const id = this.selectedEmployeeId();

      if (!id || id.trim() === '') {
        return null; // boşsa istek atma
      }

      const endpoint = `${api}/employees/${id}`;
      const res = await lastValueFrom(
        this.#http.get<ResultModel<any>>(endpoint)
      );
      console.log(res.data);

      const data = res.data;

      const mappedEmployee: EmployeeModel = {
        ...data,
        personnelInformation: {
          identityNumber: data.identityNumber ?? '',
          email: data.email ?? null,
          phone1: data.phone1 ?? null,
          phone2: data.phone2 ?? null,
        },
      };

      return mappedEmployee;
    },
  });

  getEmployee(id: string) {
    this.selectedEmployeeId.set(id);
    this.getEmployeeResult.reload();
  }

  save(form: NgForm) {
    if (form.valid) {
      const endpoint = `${api}/employees`;
      this.loading.set(true);
      const formData = form.value;

      console.log(formData);
      this.#http
        .put<ResultModel<string>>(endpoint, formData)
        .subscribe((res) => {
          this.#toast.showToast('Başarılı', res.data!, 'info');
          this.loading.set(false);
          this.result.reload();
        });
    } else {
      this.#toast.showToast('Uyarı', 'Zorunlu alanları doldurun', 'warning');
    }
  }
}
