import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EducationModalItem } from './education-modal.types';

@Component({
  selector: 'app-education-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './education-modal.component.html',
  styleUrl: './education-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationModalComponent {
  readonly item = input<EducationModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  protected readonly modalSize = computed(() =>
    (this.item()?.galleryItems.length ?? 0) > 0 ? 'large' : 'small',
  );
  protected requestClose(): void {
    this.closed.emit();
  }
}
