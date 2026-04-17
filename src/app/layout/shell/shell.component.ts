import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
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
    TranslatePipe,
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
  private readonly translation = inject(TranslationService);
  protected readonly theme = inject(ThemeService);
  protected readonly activeLocale = this.translation.locale;
  private readonly currentOrigin = globalThis.location.origin;
  private readonly loadingApiStatus: ShellApiStatusViewModel = {
    state: 'loading',
    titleKey: 'shell.api.loading.title',
    descriptionKey: 'shell.api.loading.description',
    baseUrl: this.systemApiService.apiBaseUrl,
  };

  protected readonly apiStatus = toSignal(
    this.systemApiService.getHealth().pipe(
      map(
        (health): ShellApiStatusViewModel => ({
          state: 'connected',
          titleKey: 'shell.api.connected.title',
          descriptionKey: 'shell.api.connected.description',
          descriptionParams: {
            checkedAtUtc: health.checkedAtUtc,
          },
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
      startWith(this.loadingApiStatus),
      catchError((error: unknown) =>
        of<ShellApiStatusViewModel>({
          state: 'error',
          titleKey:
            error instanceof HttpErrorResponse && error.status === 0
              ? 'shell.api.blocked.title'
              : 'shell.api.error.title',
          descriptionKey:
            error instanceof HttpErrorResponse && error.status === 0
              ? 'shell.api.blocked.description'
              : 'shell.api.error.description',
          descriptionParams:
            error instanceof HttpErrorResponse && error.status === 0
              ? {
                  origin: this.currentOrigin,
                }
              : undefined,
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
    ),
    {
      initialValue: this.loadingApiStatus,
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
