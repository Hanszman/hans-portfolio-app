import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortfolioPageIntroComponent } from '../../layout/page-intro/portfolio-page-intro.component';
import { PortfolioPageWrapperComponent } from '../../layout/page-wrapper/portfolio-page-wrapper.component';
import { PortfolioSurfaceComponent } from '../../layout/surface/portfolio-surface.component';

@Component({
  selector: 'app-skills-page',
  imports: [
    PortfolioPageIntroComponent,
    PortfolioPageWrapperComponent,
    PortfolioSurfaceComponent,
  ],
  templateUrl: './skills-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPageComponent {}
