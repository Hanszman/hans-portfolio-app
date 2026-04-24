import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-page-intro',
  imports: [ContainerComponent],
  templateUrl: './page-intro.component.html',
  styleUrl: './page-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageIntroComponent {
  readonly sectionLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
