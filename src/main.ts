import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { loadRemoteEntry } from './mf/loadRemoteEntry';

const REMOTE_URL = 'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js';

async function init() {
  console.log('[INIT] Iniciando aplicação Angular com MF remoto...');

  // Cria o share scope fake (pro compat com Module Federation)
  (globalThis as any).__webpack_share_scopes__ = { default: {} };

  try {
    console.log('[INIT] Carregando remoteEntry.js:', REMOTE_URL);
    await loadRemoteEntry(REMOTE_URL);
    console.log('[INIT] remoteEntry.js carregado!');

    const container = (window as any).hans_ui_lib;
    if (!container) {
      throw new Error('⚠️ Remote container "hans_ui_lib" não encontrado no window!');
    }

    if (container.init) {
      console.log('[INIT] Inicializando container remoto...');
      await container.init((globalThis as any).__webpack_share_scopes__.default);
      console.log('[INIT] Container inicializado.');
    }

    console.log('[INIT] Obtendo defineWebComponents...');
    const module = await container.get('./define');
    const { defineWebComponents } = module();
    console.log('[INIT] Registrando Web Components...');
    defineWebComponents();
    console.log('[INIT] Web Components definidos com sucesso!');
  } catch (err) {
    console.error('[ERRO AO CARREGAR REMOTE]:', err);
  }

  console.log('[INIT] Bootstrap Angular...');
  await bootstrapApplication(App, appConfig);
  console.log('[INIT] Angular inicializado!');
}

init().catch((err) => console.error('App init failed:', err));
