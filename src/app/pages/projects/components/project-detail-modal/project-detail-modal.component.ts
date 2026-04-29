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
import { ProjectCaseViewModel } from '../../projects.types';

interface ProjectChartSeries {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-detail-modal.component.html',
  styleUrl: './project-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailModalComponent {
  private readonly translationService = inject(TranslationService);

  readonly project = input<ProjectCaseViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly chartCategories = computed(() => [
    this.translationService.instant('pages.projects.detail.chart.technologies'),
    this.translationService.instant('pages.projects.detail.chart.companies'),
    this.translationService.instant('pages.projects.detail.chart.links'),
    this.translationService.instant('pages.projects.detail.chart.images'),
  ]);

  protected readonly chartSeries = computed<readonly ProjectChartSeries[]>(() => {
    const project = this.project();

    if (!project) {
      return [];
    }

    return [
      {
        name: this.translationService.instant('pages.projects.detail.chart.series'),
        data: [
          project.technologies.length + project.extraTechnologyCount,
          project.companyNames.length,
          project.links.length,
          project.galleryItems.length,
        ],
      },
    ];
  });

  protected requestClose(): void {
    this.closed.emit();
  }
}

