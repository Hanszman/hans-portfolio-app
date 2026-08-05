import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-modal-skeleton',
  standalone: true,
  templateUrl: './modal-skeleton.component.html',
  styleUrl: './modal-skeleton.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
})
export class ModalSkeletonComponent {
  private readonly themeService = inject(ThemeService);

  readonly width = input('100%');
  readonly height = input('1rem');
  readonly ariaLabel = input('Loading content');

  protected readonly loadingColor = computed(() =>
    this.themeService.mode() === 'dark' ? 'neutral' : 'primary',
  );
}
