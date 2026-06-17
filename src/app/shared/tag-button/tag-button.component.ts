import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TagButtonViewModel } from './tag-button.types';

@Component({
  selector: 'app-tag-button',
  standalone: true,
  templateUrl: './tag-button.component.html',
  styleUrl: './tag-button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagButtonComponent<TValue = unknown> {
  readonly tag = input.required<TagButtonViewModel<TValue>>();
  readonly tagColor = input('info');
  readonly selected = output<TValue>();

  protected requestSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.selected.emit(this.tag().value);
  }
}
