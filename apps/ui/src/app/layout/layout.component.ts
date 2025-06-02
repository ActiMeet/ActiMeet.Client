import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, NgFor, NgClass],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
  onlineUsers = [
    {
      username: 'mehmetc',
      avatar: 'https://i.pravatar.cc/40?img=1',
      isOnline: true,
    },
    {
      username: 'ayse_k',
      avatar: 'https://i.pravatar.cc/40?img=2',
      isOnline: false,
    },
    {
      username: 'dev_guy',
      avatar: 'https://i.pravatar.cc/40?img=3',
      isOnline: true,
    },
  ];
}
