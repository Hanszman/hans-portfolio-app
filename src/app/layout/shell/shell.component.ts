import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';
import { TranslationService } from '../../core/translation/translation.service';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { readNavigationItems } from '../navigation/helpers/navigation.helper';

const NAVIGATION_LABEL_KEY_BY_PATH: Record<string, AppTranslationKey> = {
  '/home': 'header.navigation.home',
  '/experiences': 'header.navigation.experiences',
  '/skills': 'header.navigation.skills',
  '/projects': 'header.navigation.projects',
  '/dashboard': 'header.navigation.dashboard',
};

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly translation = inject(TranslationService);
  protected readonly theme = inject(ThemeService);
  protected readonly activeLocale = this.translation.locale;

  protected readonly navigationItems = computed(() => {
    this.translation.locale();

    return readNavigationItems(this.router.config).map((item) => ({
      ...item,
      label: this.translation.instant(NAVIGATION_LABEL_KEY_BY_PATH[item.path]!),
    }));
  });
}
