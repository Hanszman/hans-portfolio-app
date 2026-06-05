import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../core/translation/translation.types';

@Component({
  selector: 'app-location',
  imports: [TranslatePipe],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  readonly labelKey = input.required<AppTranslationKey>();
}
