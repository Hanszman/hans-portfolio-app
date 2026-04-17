import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import { SystemApiService } from '../../core/api/system-api.service';
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
  private readonly currentOrigin = globalThis.location.origin;

  protected readonly apiStatus = toSignal(
    this.systemApiService.getHealth().pipe(
      map(
        (health): ShellApiStatusViewModel => ({
          state: 'connected',
          title: 'API connected',
          description: `Health check passed at ${health.checkedAtUtc}.`,
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
      startWith({
        state: 'loading',
        title: 'Connecting to API',
        description: 'Checking the backend availability for the current environment.',
        baseUrl: this.systemApiService.apiBaseUrl,
      } satisfies ShellApiStatusViewModel),
      catchError((error: unknown) =>
        of<ShellApiStatusViewModel>({
          state: 'error',
          title:
            error instanceof HttpErrorResponse && error.status === 0
              ? 'API request blocked'
              : 'API request failed',
          description:
            error instanceof HttpErrorResponse && error.status === 0
              ? `The browser could not complete the initial backend request from ${this.currentOrigin}. The API may be online, but the access can still be blocked by CORS or network policy.`
              : 'The initial backend health check could not be completed for the current environment.',
          baseUrl: this.systemApiService.apiBaseUrl,
        }),
      ),
    ),
    {
      initialValue: {
        state: 'loading',
        title: 'Connecting to API',
        description: 'Checking the backend availability for the current environment.',
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
