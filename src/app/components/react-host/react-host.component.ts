import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ModuleFederationLoaderService } from '../../services/module-federation-loader.service';
interface MountResult {
  unmount?: () => void;
}

interface RemoteModule {
  mount?: (el: HTMLElement, props?: Record<string, unknown>) => MountResult;
  default?: RemoteModule;
}

@Component({
  selector: 'app-react-host',
  template: `<div #container></div>`,
})
export class ReactHostComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() props?: Record<string, unknown>;
  @Input() remoteModulePath = './Widget'; // default; pode passar './Button' etc.
  private readonly loader = inject(ModuleFederationLoaderService);
  private unmountFn?: () => void;

  async ngOnInit(): Promise<void> {
    const remoteUrl = 'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js';
    const scope = 'hans_ui_design_lib';
    const module = this.remoteModulePath;

    try {
      const loaded = (await this.loader.loadRemote(remoteUrl, scope, module)) as RemoteModule;

      const moduleToUse = loaded?.mount ? loaded : loaded?.default ? loaded.default : undefined;

      if (!moduleToUse?.mount) {
        console.error('mount não encontrado no módulo remoto', loaded);
        return;
      }

      const result = moduleToUse.mount(this.containerRef.nativeElement, this.props);
      this.unmountFn = result?.unmount;
    } catch (err) {
      console.error('Erro ao carregar remoto:', err);
    }
  }

  ngOnDestroy(): void {
    this.unmountFn?.();
  }
}
