import { Injectable } from '@angular/core';

// loadRemoteModule helper from angular-architects
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable({ providedIn: 'root' })
export class MfLoaderService {
  async loadRemoteDefine(remoteUrl = 'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js') {
    // load remote that exposes './define'
    const m = await loadRemoteModule({
      remoteEntry: remoteUrl,
      remoteName: 'hans_ui_lib',
      exposedModule: './define',
    });
    // espera que o módulo exporte defineWebComponents
    if (m && typeof m.defineWebComponents === 'function') {
      console.log('Remote module loaded:', m);
      m.defineWebComponents();
    } else {
      console.warn('remote defineWebComponents not found', m);
    }
  }
}
