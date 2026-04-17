import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import { SurfaceComponent } from '../../layout/surface/surface.component';

@Component({
  selector: 'app-experiences',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    SurfaceComponent,
  ],
  templateUrl: './experiences.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesComponent {}
