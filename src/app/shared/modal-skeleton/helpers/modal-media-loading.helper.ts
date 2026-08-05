import { signal } from '@angular/core';

export function uniqueModalMediaSources(sources: readonly string[]): string[] {
  return [...new Set(sources.filter(Boolean))];
}

export class ModalMediaLoadingTracker {
  private expectedSources = new Set<string>();
  private settledSources = new Set<string>();
  readonly isLoading = signal(false);

  reset(sources: readonly string[], isOpen: boolean): void {
    this.expectedSources = new Set(uniqueModalMediaSources(sources));
    this.settledSources.clear();
    this.isLoading.set(isOpen && this.expectedSources.size > 0);
  }

  settle(source: string): void {
    if (!this.expectedSources.has(source)) {
      return;
    }

    this.settledSources.add(source);
    if (this.settledSources.size === this.expectedSources.size) {
      this.isLoading.set(false);
    }
  }
}
