import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagButtonComponent } from '../tag/tag-button/tag-button.component';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';
import { ProjectModalItem } from './project-modal.types';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [TagButtonComponent, TranslatePipe],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectModalComponent {
  readonly project = input<ProjectModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  readonly openTechnology = output<TechnologyModalItem>();
  protected readonly modalSize = computed(() =>
    (this.project()?.galleryItems.length ?? 0) > 0 ? 'large' : 'medium',
  );

  protected requestClose(): void {
    this.closed.emit();
  }
  protected requestTechnologyDetails(technology: TechnologyModalItem): void {
    this.openTechnology.emit(technology);
  }
}
