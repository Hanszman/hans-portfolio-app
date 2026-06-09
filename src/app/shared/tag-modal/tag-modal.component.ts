import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagModalDetail, TagModalImage } from './tag-modal.types';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagModalComponent {
  readonly isOpen = input(false);
  readonly title = input('');
  readonly subtitle = input('');
  readonly image = input<TagModalImage | null>(null);
  readonly details = input<readonly TagModalDetail[]>([]);
  readonly closed = output<void>();

  protected requestClose(): void {
    this.closed.emit();
  }
}
