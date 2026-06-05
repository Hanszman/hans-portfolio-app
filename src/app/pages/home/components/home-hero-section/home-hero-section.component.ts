import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HomeHeroViewModel } from '../../home.types';
import { LocationComponent } from '../../../../shared/location/location.component';
import { SocialLinksComponent } from '../../../../shared/social-links/social-links.component';

@Component({
  selector: 'app-home-hero-section',
  imports: [LocationComponent, RouterLink, SocialLinksComponent, TranslatePipe],
  templateUrl: './home-hero-section.component.html',
  styleUrl: './home-hero-section.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroSectionComponent {
  readonly hero = input.required<HomeHeroViewModel>();
}
