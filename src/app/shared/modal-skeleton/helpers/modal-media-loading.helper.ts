import { signal } from '@angular/core';

export function uniqueModalMediaSources(sources: readonly string[]): string[] {
  return [...new Set(sources.filter(Boolean))];
}

export class ModalMediaLoadingTracker {
  private readonly settledSources = signal<ReadonlySet<string>>(new Set());

  isLoading(sources: readonly string[], isOpen: boolean): boolean {
    if (!isOpen) return false;

    const expectedSources = uniqueModalMediaSources(sources);
    const settledSources = this.settledSources();
    return expectedSources.some((source) => !settledSources.has(source));
  }

  settle(source: string): void {
    if (!source || this.settledSources().has(source)) return;

    this.settledSources.update((sources) => new Set([...sources, source]));
  }
}
