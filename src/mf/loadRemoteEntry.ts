export async function loadRemoteEntry(remoteUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = remoteUrl;
    script.type = 'module';
    script.async = true;

    script.onload = () => {
      console.log(`[MF] Remote entry carregado: ${remoteUrl}`);
      resolve();
    };

    script.onerror = (err) => {
      console.error(`[MF] Falha ao carregar remote entry: ${remoteUrl}`, err);
      reject(err);
    };

    document.head.appendChild(script);
  });
}
