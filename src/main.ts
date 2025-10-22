import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { loadRemoteEntry } from './mf/loadRemoteEntry';

const REMOTE_URL = 'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js';

async function init() {
  console.log('[INIT] Iniciando aplicação Angular com MF remoto...');

  // share scope fake — mantemos (algumas implementações esperam isso)
  (globalThis as any).__webpack_share_scopes__ = { default: {} };

  try {
    console.log('[INIT] Checando container remoto em window...');
    let container = (window as any).hans_ui_lib;

    if (!container) {
      console.log('[INIT] Container não encontrado em window — importando módulo ESM:', REMOTE_URL);
      await loadRemoteEntry(REMOTE_URL);
      container = (window as any).hans_ui_lib;
    } else {
      console.log('[INIT] Container remoto já estava em window:', !!container);
    }

    if (!container) {
      throw new Error(
        '⚠️ Remote container "hans_ui_lib" não encontrado no window depois do import!',
      );
    }

    // Se o remote foi gerado pelo plugin Vite, ele expõe uma função init/get
    if (typeof container.init === 'function') {
      console.log('[INIT] Inicializando container remoto (container.init)...');
      // Para remotes Vite-originjs, eles podem esperar o objeto global de shared no formato deles.
      // Chamamos passando o share scope (pode ser um noop).
      await container.init((globalThis as any).__webpack_share_scopes__.default).catch((e: any) => {
        console.warn('[INIT] container.init rejeitou (pode ser normal para ESM remotes):', e);
      });
    } else {
      console.log('[INIT] container.init não encontrado — pulando init.');
    }

    console.log('[INIT] Obtendo defineWebComponents do remoto...');
    // container.get pode ser uma função que retorna factory (Vite remote) — aqui tratamos ambos os casos:
    let moduleFactory;
    if (typeof container.get === 'function') {
      moduleFactory = await container.get('./define');
    } else if (container['./define']) {
      // fallback se o remote tiver shaped differently
      moduleFactory = container['./define'];
    }

    // Para remotes originjs, moduleFactory pode ser uma função que retorna o módulo
    const module = typeof moduleFactory === 'function' ? moduleFactory() : moduleFactory;
    const { defineWebComponents } = module;
    if (typeof defineWebComponents === 'function') {
      console.log('[INIT] Registrando Web Components do remoto...');
      defineWebComponents();
      console.log('[INIT] Web Components registrados!');
    } else {
      console.warn('[INIT] defineWebComponents não encontrada no módulo remoto:', module);
    }
  } catch (err) {
    console.error('[ERRO AO CARREGAR REMOTE]:', err);
  }

  console.log('[INIT] Bootstrap Angular...');
  await bootstrapApplication(App, appConfig);
  console.log('[INIT] Angular inicializado!');
}

init().catch((err) => console.error('App init failed:', err));
