import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { catchError, map, of, startWith } from 'rxjs';
import { SystemApiService } from '../../core/api/system-api.service';

interface AppShellApiStatusViewModel {
  readonly state: 'loading' | 'connected' | 'error';
  readonly title: string;
  readonly description: string;
  readonly baseUrl: string;
}

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly systemApiService = inject(SystemApiService);

  protected readonly apiStatus = toSignal(
    this.systemApiService.getHealth().pipe(
      map(
        (health): AppShellApiStatusViewModel => ({
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
      } satisfies AppShellApiStatusViewModel),
      catchError(() =>
        of<AppShellApiStatusViewModel>({
          state: 'error',
          title: 'API unavailable',
          description:
            'The initial backend health check could not be completed from the current environment.',
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
      } satisfies AppShellApiStatusViewModel,
    },
  );

  protected readonly apiStatusClasses = computed(() => ({
    'app-shell-api-status': true,
    'app-shell-api-status-loading': this.apiStatus().state === 'loading',
    'app-shell-api-status-connected': this.apiStatus().state === 'connected',
    'app-shell-api-status-error': this.apiStatus().state === 'error',
  }));
}
