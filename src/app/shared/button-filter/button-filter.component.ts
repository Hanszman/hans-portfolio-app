import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { ButtonFilterOption } from './button-filter.types';

@Component({
  selector: 'app-button-filter',
  imports: [TranslatePipe],
  templateUrl: './button-filter.component.html',
  styleUrl: './button-filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFilterComponent {
  readonly labelKey = input.required<AppTranslationKey>();
  readonly options = input.required<readonly ButtonFilterOption[]>();
  readonly selectedValue = input.required<string>();
  readonly valueSelected = output<string>();
}
