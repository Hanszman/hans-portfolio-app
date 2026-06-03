import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeStackChipViewModel } from '../../home.types';

@Component({
  selector: 'app-home-stack-chips',
  imports: [TranslatePipe],
  templateUrl: './home-stack-chips.component.html',
  styleUrl: './home-stack-chips.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeStackChipsComponent {
  readonly labelKey = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
  readonly chips = input<readonly HomeStackChipViewModel[]>([]);
}
