import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/translation/translation.service';
import { NavigationItem } from '../navigation/navigation.types';
import { SurfaceComponent } from '../surface/surface.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, SurfaceComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly navigationItems = input.required<readonly NavigationItem[]>();

  protected readonly i18n = inject(TranslationService);
}
