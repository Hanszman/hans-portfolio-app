import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationControlsComponent {
  readonly currentPage = input(1);
  readonly totalPages = input(0);
  readonly disabled = input(false);

  readonly pageSelected = output<number>();

  protected readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );
  protected readonly canGoPrevious = computed(
    () => !this.disabled() && this.currentPage() > 1,
  );
  protected readonly canGoNext = computed(
    () => !this.disabled() && this.currentPage() < this.totalPages(),
  );

  protected selectPage(page: number): void {
    if (
      this.disabled() ||
      page < 1 ||
      page > this.totalPages() ||
      page === this.currentPage()
    ) {
      return;
    }

    this.pageSelected.emit(page);
  }
}
