import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TruncatedTextComponent } from '../truncated-text/truncated-text.component';
import { CardViewModel } from './card.types';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TranslatePipe, TruncatedTextComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly card = input.required<CardViewModel>();
  readonly selected = output<void>();

  protected selectCard(): void {
    if (this.card().interactive) {
      this.selected.emit();
    }
  }
}
