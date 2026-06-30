import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { SurfaceCardComponent } from '../../../../shared/surface-card/surface-card.component';
import {
  DashboardChartViewModel,
  DashboardTechnologyTypeOptionViewModel,
} from '../../dashboard.types';
import { SkillTypeFilterValue } from '../../../skills/skills.types';

@Component({
  selector: 'app-dashboard-project-technology-panel',
  standalone: true,
  imports: [SurfaceCardComponent, InfoStateComponent, TranslatePipe],
  templateUrl: './dashboard-project-technology-panel.component.html',
  styleUrl: './dashboard-project-technology-panel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProjectTechnologyPanelComponent {
  readonly labelKey = input.required<AppTranslationKey>();
  readonly titleKey = input.required<AppTranslationKey>();
  readonly descriptionKey = input.required<AppTranslationKey>();
  readonly selectLabelKey = input.required<AppTranslationKey>();
  readonly emptyMessageKey = input.required<AppTranslationKey>();
  readonly options = input<readonly DashboardTechnologyTypeOptionViewModel[]>([]);
  readonly selectedTechnologyType = input<SkillTypeFilterValue>(
    'PROGRAMMING_LANGUAGES',
  );
  readonly chart = input<DashboardChartViewModel | null>(null);

  readonly technologyTypeChange = output<SkillTypeFilterValue>();

  protected resolveSelectValue(event: Event): SkillTypeFilterValue {
    const customEvent = event as Event & {
      detail?: string | { value?: string };
      target: (EventTarget & { value?: string }) | null;
    };

    const rawValue =
      typeof customEvent.detail === 'string'
        ? customEvent.detail
        : customEvent.detail?.value ?? customEvent.target?.value ?? '';

    return rawValue as SkillTypeFilterValue;
  }
}
