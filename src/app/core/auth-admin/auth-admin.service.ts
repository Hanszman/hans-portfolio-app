import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminAuthApiService } from '../api/auth-admin/auth-admin.service';
import { AdminAuthUserResponse } from '../api/auth-admin/auth-admin.types';
import { AdminAuthCredentials, AdminAuthState } from './auth-admin.types';

export const ADMIN_AUTH_STORAGE_KEY = 'hans-admin-access-token';

const createInitialState = (): AdminAuthState => ({
  accessToken: sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY),
  user: null,
  isSubmittingLogin: false,
  isRestoringSession: false,
  loginErrorKey: null,
});

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly adminAuthApiService = inject(AdminAuthApiService);
  private readonly stateSignal = signal<AdminAuthState>(createInitialState());

  readonly state = this.stateSignal.asReadonly();
  readonly accessToken = computed(() => this.stateSignal().accessToken);
  readonly user = computed(() => this.stateSignal().user);
  readonly isSubmittingLogin = computed(() => this.stateSignal().isSubmittingLogin);
  readonly isRestoringSession = computed(
    () => this.stateSignal().isRestoringSession,
  );
  readonly loginErrorKey = computed(() => this.stateSignal().loginErrorKey);
  readonly hasAccessToken = computed(() => Boolean(this.accessToken()));
  readonly isAuthenticated = computed(
    () => this.hasAccessToken() && this.user() !== null,
  );

  async login(credentials: AdminAuthCredentials): Promise<boolean> {
    this.patchState({
      isSubmittingLogin: true,
      loginErrorKey: null,
    });

    try {
      const response = await firstValueFrom(
        this.adminAuthApiService.login(credentials),
      );

      this.setSession(response.accessToken, response.user);

      return true;
    } catch {
      this.clearSession();
      this.patchState({
        loginErrorKey: 'pages.adminLogin.feedback.invalidCredentials',
      });

      return false;
    } finally {
      this.patchState({
        isSubmittingLogin: false,
      });
    }
  }

  async restoreSession(): Promise<AdminAuthUserResponse | null> {
    const accessToken = this.accessToken();

    if (!accessToken) {
      return null;
    }

    if (this.user()) {
      return this.user();
    }

    this.patchState({
      isRestoringSession: true,
      loginErrorKey: null,
    });

    try {
      const user = await firstValueFrom(
        this.adminAuthApiService.getSession(accessToken),
      );

      this.patchState({
        user,
      });

      return user;
    } catch {
      this.clearSession();
      return null;
    } finally {
      this.patchState({
        isRestoringSession: false,
      });
    }
  }

  logout(): void {
    this.clearSession();
  }

  private setSession(
    accessToken: string,
    user: AdminAuthUserResponse,
  ): void {
    sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, accessToken);
    this.patchState({
      accessToken,
      user,
      loginErrorKey: null,
    });
  }

  private clearSession(): void {
    sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    this.patchState({
      accessToken: null,
      user: null,
    });
  }

  private patchState(patch: Partial<AdminAuthState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch,
    }));
  }
}
