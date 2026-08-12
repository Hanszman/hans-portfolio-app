import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { parseFormattedText } from './helpers/formatted-text.helper';

@Component({
  selector: 'app-formatted-text',
  standalone: true,
  templateUrl: './formatted-text.component.html',
  styleUrl: './formatted-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormattedTextComponent {
  readonly text = input('');
  protected readonly blocks = computed(() => parseFormattedText(this.text()));
}
