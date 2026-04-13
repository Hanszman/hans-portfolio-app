import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  templateUrl: './page-intro.component.html',
  styleUrl: './page-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageIntroComponent {
  readonly sectionLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
