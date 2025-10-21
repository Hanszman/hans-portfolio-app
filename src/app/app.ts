import { Component, OnInit, inject, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MfLoaderService } from './services/mf-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App implements OnInit {
  protected readonly title = signal('hans-portfolio-app');
  private readonly mfLoader = inject(MfLoaderService);

  async ngOnInit() {
    await this.mfLoader.loadRemoteDefine(
      'https://hans-ui-design-lib-cdn.vercel.app/remoteEntry.js',
    );
  }
}
