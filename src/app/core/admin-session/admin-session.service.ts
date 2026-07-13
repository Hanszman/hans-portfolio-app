import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AdminAuthenticationService } from '../api/admin/admin-auth/admin-auth.service';
import { AdminAuthenticatedUser } from '../api/admin/admin-auth/admin-auth.types';
import {
  ADMIN_SESSION_STORAGE_KEY,
  AdminLoginCredentials,
  AdminSessionState,
  createAdminSessionState,
} from './admin-session.types';

@Injectable({
  providedIn: 'root',
})
export class AdminSessionService {
  private readonly adminAuthenticationService = inject(AdminAuthenticationService);
  private readonly stateSignal = signal<AdminSessionState>(
    createAdminSessionState(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)),
  );

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

  async login(credentials: AdminLoginCredentials): Promise<boolean> {
    this.patchState({
      isSubmittingLogin: true,
      loginErrorKey: null,
    });

    try {
      const response = await firstValueFrom(
        this.adminAuthenticationService.login(credentials),
      );

      this.setSession(response.accessToken, response.user);

      return true;
    } catch {
      this.clearSession();
      this.patchState({
        loginErrorKey: 'pages.login.feedback.invalidCredentials',
      });

      return false;
    } finally {
      this.patchState({
        isSubmittingLogin: false,
      });
    }
  }

  async restoreSession(): Promise<AdminAuthenticatedUser | null> {
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
        this.adminAuthenticationService.getSession(accessToken),
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
    user: AdminAuthenticatedUser,
  ): void {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, accessToken);
    this.patchState({
      accessToken,
      user,
      loginErrorKey: null,
    });
  }

  private clearSession(): void {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    this.patchState({
      accessToken: null,
      user: null,
      loginErrorKey: null,
    });
  }

  private patchState(patch: Partial<AdminSessionState>): void {
    this.stateSignal.update((state) => ({
      ...state,
      ...patch,
    }));
  }
}
