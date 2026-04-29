import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/translation/translation.service';
import { ExperienceTimelineItemViewModel } from '../../experiences.types';

interface ExperienceChartSeries {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-experience-detail-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience-detail-modal.component.html',
  styleUrl: './experience-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceDetailModalComponent {
  private readonly translationService = inject(TranslationService);

  readonly item = input<ExperienceTimelineItemViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly chartCategories = computed(() => [
    this.translationService.instant('pages.experiences.detail.chart.jobs'),
    this.translationService.instant('pages.experiences.detail.chart.customers'),
    this.translationService.instant('pages.experiences.detail.chart.projects'),
    this.translationService.instant('pages.experiences.detail.chart.technologies'),
  ]);

  protected readonly chartSeries = computed<readonly ExperienceChartSeries[]>(() => {
    const item = this.item();

    if (!item) {
      return [];
    }

    return [
      {
        name: this.translationService.instant('pages.experiences.detail.chart.series'),
        data: [
          item.jobs.length,
          item.customers.length,
          item.projects.length,
          item.technologies.length + item.extraTechnologyCount,
        ],
      },
    ];
  });

  protected requestClose(): void {
    this.closed.emit();
  }
}
