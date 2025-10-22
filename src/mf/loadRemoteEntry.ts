// src/mf/loadRemoteEntry.ts
export async function loadRemoteEntry(remoteUrl: string): Promise<void> {
  try {
    // ⚠️ O comentário /* @vite-ignore */ impede que bundlers como Vite tentem analisar a string aqui.
    const remoteModule = await import(/* @vite-ignore */ remoteUrl);

    // O plugin de Vite (originjs) exporta funções como get e init.
    // Para compatibilidade com seu main.ts, colocamos o módulo no window com o nome do container.
    // O nome precisa bater com o 'name' que você usou no vite-mf.config.ts
    (window as any).hans_ui_lib = remoteModule;
    console.log(`[MF] Remote module importado e atribuído a window.hans_ui_lib: ${remoteUrl}`);
  } catch (err) {
    console.error(`[MF] Falha ao importar remote module via ESM: ${remoteUrl}`, err);
    throw err;
  }
}
