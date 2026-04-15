import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioPageWrapperComponent } from '../../layout/page-wrapper/portfolio-page-wrapper.component';
import { PageIntroComponent } from '../../shared/ui/page-intro/page-intro.component';
import { readRoutePageData } from './helpers/route-page-data.helper';

@Component({
  selector: 'app-route-page',
  imports: [PageIntroComponent, PortfolioPageWrapperComponent],
  templateUrl: './route-page.component.html',
  styleUrl: './route-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly content = computed(() => readRoutePageData(this.route.snapshot.data));
}
