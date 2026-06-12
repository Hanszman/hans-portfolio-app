import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SkillCardViewModel } from '../../skills.types';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillCardComponent {
  readonly item = input.required<SkillCardViewModel>();
  readonly openDetails = output<SkillCardViewModel>();

  protected requestDetails(): void {
    this.openDetails.emit(this.item());
  }
}
