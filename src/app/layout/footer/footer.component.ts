import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationItem } from '../navigation/navigation.types';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslatePipe, ContainerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly navigationItems = input.required<readonly NavigationItem[]>();
}
