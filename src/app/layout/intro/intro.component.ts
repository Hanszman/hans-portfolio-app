import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-intro',
  imports: [ContainerComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  readonly sectionLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
