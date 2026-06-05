import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { InfoStateMode } from './info-state.types';

@Component({
  selector: 'app-info-state',
  standalone: true,
  templateUrl: './info-state.component.html',
  styleUrl: './info-state.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoStateComponent {
  readonly mode = input.required<InfoStateMode>();
  readonly message = input.required<string>();
}
