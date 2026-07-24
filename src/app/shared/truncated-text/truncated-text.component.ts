import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-truncated-text',
  standalone: true,
  template: `{{ displayText() }}`,
  styleUrl: './truncated-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.title]': 'titleText()',
  },
})
export class TruncatedTextComponent {
  readonly text = input('');
  readonly maxLength = input(48);
  readonly showTitle = input(true);

  protected readonly displayText = computed(() => {
    const value = this.text();
    const maxLength = Math.max(this.maxLength(), 3);

    if (value.length <= maxLength) {
      return value;
    }

    return `${value.slice(0, maxLength - 3)}...`;
  });

  protected readonly titleText = computed(() =>
    this.showTitle() ? this.text() : null,
  );
}
