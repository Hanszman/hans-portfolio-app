import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModuleFederationLoaderService } from '../../services/module-federation-loader.service';

@Component({
  selector: 'app-react-host',
  template: `<div #container></div>`,
})
export class ReactHostComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @Input() props: any;
  private unmountFn?: () => void;

  constructor(private moduleFederationLoader: ModuleFederationLoaderService) {}

  async ngOnInit() {
    // ajustar a URL para o remoteEntry webpack que você publicou
    const remoteUrl = 'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js';
    const scope = 'hans_ui_design_lib';
    const module = './Widget'; // conforme exposto no webpack.mf.config.js

    try {
      const Module: any = await this.moduleFederationLoader.loadRemote(remoteUrl, scope, module);
      // Module pode exportar mount (como fizemos)
      if (Module && Module.mount) {
        const result = Module.mount(this.containerRef.nativeElement, this.props);
        this.unmountFn = result?.unmount;
      } else if (Module && Module.default && Module.default.mount) {
        const result = Module.default.mount(this.containerRef.nativeElement, this.props);
        this.unmountFn = result?.unmount;
      } else {
        console.error('Module loaded but mount not found', Module);
      }
    } catch (err) {
      console.error('Erro ao carregar remoto', err);
    }
  }

  ngOnDestroy() {
    if (this.unmountFn) this.unmountFn();
  }
}
