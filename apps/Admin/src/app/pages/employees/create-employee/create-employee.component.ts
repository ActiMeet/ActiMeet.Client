import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import BlankComponent from '../../../components/blank/blank.component';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { EmployeeModel } from '../../../models/employee.model';
import { FormsModule, NgForm } from '@angular/forms';
import { FlexiStepperModule } from 'flexi-stepper';
import { HttpClient } from '@angular/common/http';
import { FormValidateDirective } from 'form-validate-angular';
import { ResultModel } from '../../../models/result.model';
import { NgxMaskDirective } from 'ngx-mask';
import { api } from '../../../constants';
import { FlexiToastService } from 'flexi-toast';
import { Location } from '@angular/common';

@Component({
  imports: [
    FormsModule,
    BlankComponent,
    FlexiStepperModule,
    FormValidateDirective,
    NgxMaskDirective,
  ],
  templateUrl: './create-employee.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateEmployeeComponent {
  readonly data = signal<EmployeeModel>(new EmployeeModel());
  readonly loading = signal<boolean>(false);

  readonly #breadcrumb = inject(BreadcrumbService);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #location = inject(Location);

  constructor() {
    this.#breadcrumb.reset();
    this.#breadcrumb.add('Çalışanlar', '/employees', 'person_apron');
    this.#breadcrumb.add('Çalışan Ekle', '/employees/create', 'add');
  }

  save(form: NgForm) {
    if (form.valid) {
      const endpoint = `${api}/employees`;
      this.loading.set(true);

      console.log(this.data());
      this.#http
        .post<ResultModel<string>>(endpoint, this.data())
        .subscribe((res) => {
          this.#toast.showToast('Başarılı', res.data!, 'success');
          this.loading.set(false);
          this.#location.back();
        });
    } else {
      this.#toast.showToast('Uyarı', 'Zorunlu alanları doldurun', 'warning');
    }
  }
}
