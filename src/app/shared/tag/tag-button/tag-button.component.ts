import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TagButtonViewModel } from './tag-button.types';

@Component({
  selector: 'app-tag-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './tag-button.component.html',
  styleUrl: './tag-button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagButtonComponent<TValue = unknown> {
  readonly tag = input.required<TagButtonViewModel<TValue>>();
  readonly tagColor = input('base');
  readonly interactive = input(true);
  readonly selected = output<TValue>();

  protected requestSelection(event: MouseEvent): void {
    event.stopPropagation();
    this.selected.emit(this.tag().value);
  }
}
