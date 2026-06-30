import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-surface-card',
  standalone: true,
  templateUrl: './surface-card.component.html',
  styleUrl: './surface-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceCardComponent {}
