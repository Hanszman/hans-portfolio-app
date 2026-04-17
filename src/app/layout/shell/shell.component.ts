import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import { SystemApiService } from '../../core/api/system-api.service';
import { ThemeService } from '../../core/theme/theme.service';
import { TranslationService } from '../../core/translation/translation.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { readNavigationItems } from '../navigation/helpers/navigation.helper';
import { SurfaceComponent } from '../surface/surface.component';
import { SurfaceTone } from '../surface/surface.types';
import { ShellApiStatusViewModel } from './shell.types';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SurfaceComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly systemApiService = inject(SystemApiService);
  protected readonly i18n = inject(TranslationService);
  protected readonly theme = inject(ThemeService);
  private readonly currentOrigin = globalThis.location.origin;

  protected readonly apiStatus = toSignal(
    this.systemApiService.getHealth().pipe(
      map(
        (health): ShellApiStatusViewModel => ({
          state: 'connected',
          title: this.i18n.t('shell.api.connected.title'),
          description: this.i18n.t('shell.api.connected.description', {
            checkedAtUtc: health.checkedAtUtc,
          }),
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
      startWith({
        state: 'loading',
        title: this.i18n.t('shell.api.loading.title'),
        description: this.i18n.t('shell.api.loading.description'),
        baseUrl: this.systemApiService.apiBaseUrl,
      } satisfies ShellApiStatusViewModel),
      catchError((error: unknown) =>
        of<ShellApiStatusViewModel>({
          state: 'error',
          title:
            error instanceof HttpErrorResponse && error.status === 0
              ? this.i18n.t('shell.api.blocked.title')
              : this.i18n.t('shell.api.error.title'),
          description:
            error instanceof HttpErrorResponse && error.status === 0
              ? this.i18n.t('shell.api.blocked.description', {
                  origin: this.currentOrigin,
                })
              : this.i18n.t('shell.api.error.description'),
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
    ),
    {
      initialValue: {
        state: 'loading',
        title: this.i18n.t('shell.api.loading.title'),
        description: this.i18n.t('shell.api.loading.description'),
        baseUrl: this.systemApiService.apiBaseUrl,
      } satisfies ShellApiStatusViewModel,
    },
  );

  protected readonly navigationItems = computed(() =>
    readNavigationItems(this.router.config),
  );

  protected readonly apiStatusTone = computed<SurfaceTone>(() => {
    const statusState = this.apiStatus().state;

    if (statusState === 'connected') {
      return 'success';
    }

    return statusState === 'error' ? 'danger' : 'warning';
  });
}
