import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TagModalComponent } from '../tag/tag-modal/tag-modal.component';
import { SpokenLanguageModalItem } from './spoken-language-modal.types';

@Component({
  selector: 'app-spoken-language-modal',
  standalone: true,
  imports: [TagModalComponent],
  templateUrl: './spoken-language-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpokenLanguageModalComponent {
  readonly item = input<SpokenLanguageModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
}
