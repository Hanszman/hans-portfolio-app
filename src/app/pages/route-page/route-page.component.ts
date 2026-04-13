import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { readFoundationRouteData } from '../../helpers/route-data.helper';
import { PageIntroComponent } from '../../shared/ui/page-intro/page-intro.component';

@Component({
  selector: 'app-route-page',
  imports: [PageIntroComponent],
  templateUrl: './route-page.component.html',
  styleUrl: './route-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly content = computed(() =>
    readFoundationRouteData(this.route.snapshot.data),
  );
}
