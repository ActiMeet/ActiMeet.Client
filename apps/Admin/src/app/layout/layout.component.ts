import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
