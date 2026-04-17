export interface ShellApiStatusViewModel {
  readonly state: 'loading' | 'connected' | 'error';
  readonly title: string;
  readonly description: string;
  readonly baseUrl: string;
}
