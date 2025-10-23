import { Injectable } from '@angular/core';

declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;

@Injectable({ providedIn: 'root' })
export class ModuleFederationLoaderService {
  async loadRemote(remoteUrl: string, scope: string, module: string) {
    await this.loadRemoteEntryScript(remoteUrl, scope);
    await __webpack_init_sharing__('default');
    const container = (window as any)[scope];
    if (!container) throw new Error('container not found: ' + scope);
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  }

  private loadRemoteEntryScript(url: string, scope: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any)[scope]) return resolve();
      const el = document.createElement('script');
      el.src = url;
      el.type = 'text/javascript';
      el.onload = () => resolve();
      el.onerror = (err) => reject(err);
      document.head.appendChild(el);
    });
  }
}
