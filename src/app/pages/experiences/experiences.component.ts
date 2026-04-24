import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import { ContainerComponent } from '../../layout/container/container.component';

@Component({
  selector: 'app-experiences',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    ContainerComponent,
    TranslatePipe,
  ],
  templateUrl: './experiences.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesComponent {}
