import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../../../core/translation/translation.service';
import { SkillCardViewModel } from '../../skills.types';

interface SkillChartSeries {
  name: string;
  data: number[];
}

@Component({
  selector: 'app-skill-detail-modal',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  templateUrl: './skill-detail-modal.component.html',
  styleUrl: './skill-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillDetailModalComponent {
  private readonly translationService = inject(TranslationService);

  readonly item = input<SkillCardViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly chartCategories = computed(
    () => this.item()?.contexts.map((context) => context.label) ?? [],
  );

  protected readonly chartSeries = computed<readonly SkillChartSeries[]>(() => {
    const contexts = this.item()?.contexts ?? [];

    return [
      {
        name: this.translationService.instant('pages.skills.detail.chartSeries'),
        data: contexts.map((context) => context.totalMonths),
      },
    ];
  });

  protected requestClose(): void {
    this.closed.emit();
  }
}
