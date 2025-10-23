import { Injectable } from '@angular/core';
interface Container {
  init: (shareScope: unknown) => Promise<void>;
  get: (module: string) => Promise<() => unknown>;
}

declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class ModuleFederationLoaderService {
  async loadRemote(remoteUrl: string, scope: string, module: string): Promise<unknown> {
    await this.loadRemoteEntryScript(remoteUrl, scope);
    await __webpack_init_sharing__('default');

    const container = (window as unknown as Record<string, Container>)[scope];
    if (!container) throw new Error(`Container não encontrado: ${scope}`);

    const shareScope = (__webpack_share_scopes__ as Record<string, unknown>)['default'];
    await container.init(shareScope);

    const factory = await container.get(module);
    return factory();
  }

  private loadRemoteEntryScript(url: string, scope: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as unknown as Record<string, unknown>)[scope]) return resolve();
      const el = document.createElement('script');
      el.src = url;
      el.type = 'text/javascript';
      el.onload = () => resolve();
      el.onerror = () => reject(new Error(`Erro ao carregar remoto: ${url}`));
      document.head.appendChild(el);
    });
  }
}
