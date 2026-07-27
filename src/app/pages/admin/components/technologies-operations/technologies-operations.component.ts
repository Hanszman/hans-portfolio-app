import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyAdminRecord } from '../../../../core/api/technologies/technologies.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { OperationsActionsComponent } from '../../../../shared/operations/operations-actions/operations-actions.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import {
  buildTechnologiesFormValue,
  buildTechnologiesMutationPayload,
  buildTechnologiesViewModels,
  buildTechnologyImageAssetOptions,
} from './helpers/technologies-operations.helper';
import {
  createEmptyTechnologiesOperationsFormValue,
  TechnologiesOperationsFormValue,
  TechnologiesOperationsModalMode,
} from './technologies-operations.types';
import { TechnologiesOperationsModalComponent } from './components/technologies-operations-modal/technologies-operations-modal.component';

@Component({
  selector: 'app-technologies-operations',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    OperationsActionsComponent,
    TechnologiesOperationsModalComponent,
  ],
  templateUrl: './technologies-operations.component.html',
  styleUrl: './technologies-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesOperationsComponent implements OnInit {
  private readonly service = inject(TechnologiesService);
  private readonly imagesService = inject(ImageAssetsOperationsService);
  private readonly session = inject(AdminSessionService);
  private readonly toast = inject(ToastService);
  private readonly recordsSignal = signal<readonly TechnologyAdminRecord[]>([]);
  private readonly imagesSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly loadingSignal = signal(true);
  private readonly submittingSignal = signal(false);
  private readonly errorSignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackSignal = signal<AppTranslationKey | null>(null);
  private readonly modeSignal = signal<TechnologiesOperationsModalMode | null>(null);
  private readonly selectedSignal = signal<TechnologyAdminRecord | null>(null);
  private readonly searchSignal = signal('');
  private readonly formSignal = signal(createEmptyTechnologiesOperationsFormValue());

  protected readonly technologies = computed(() =>
    buildTechnologiesViewModels(this.recordsSignal(), this.imagesSignal()),
  );
  protected readonly imageOptions = computed(() =>
    buildTechnologyImageAssetOptions(this.imagesSignal()),
  );
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly isLoading = this.loadingSignal.asReadonly();
  protected readonly isSubmitting = this.submittingSignal.asReadonly();
  protected readonly loadErrorKey = this.errorSignal.asReadonly();
  protected readonly modalFeedbackKey = this.feedbackSignal.asReadonly();
  protected readonly modalMode = this.modeSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly searchQuery = this.searchSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/technologies');
  protected readonly hasTechnologies = computed(
    () => this.pagination().totalItems > 0 && this.technologies().length > 0,
  );
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly modalTitleKey = computed<AppTranslationKey>(
    () =>
      `pages.admin.technologies.modal.${this.modalMode() ?? 'create'}.title` as AppTranslationKey,
  );

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedSignal.set(null);
    this.formSignal.set(createEmptyTechnologiesOperationsFormValue());
    this.modeSignal.set('create');
  }

  openReadModal(): void {
    if (this.hasTechnologies()) this.modeSignal.set('read');
  }

  openUpdatePickerModal(): void {
    this.modeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    this.modeSignal.set('pick-delete');
  }

  openUpdateModal(id: string): void {
    const item = this.recordsSignal().find((record) => record.id === id);
    if (item) {
      this.selectedSignal.set(item);
      this.formSignal.set(buildTechnologiesFormValue(item));
      this.modeSignal.set('update');
    }
  }

  openDeleteModal(id: string): void {
    const item = this.recordsSignal().find((record) => record.id === id);
    if (item) {
      this.selectedSignal.set(item);
      this.modeSignal.set('delete');
    }
  }

  closeModal(): void {
    this.modeSignal.set(null);
    this.selectedSignal.set(null);
    this.feedbackSignal.set(null);
  }

  async goToPage(page: number): Promise<void> {
    if (
      page !== this.pagination().page &&
      page > 0 &&
      page <= Math.max(this.pagination().totalPages, 1)
    )
      await this.loadWorkspace(page, this.searchQuery());
  }

  async updateSearchQuery(value: string): Promise<void> {
    const search = value.trim();
    if (search !== this.searchQuery()) {
      this.searchSignal.set(search);
      await this.loadWorkspace(1, search);
    }
  }

  updateField(field: keyof TechnologiesOperationsFormValue, value: string | boolean): void {
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  toggleImageAsset(id: string): void {
    this.formSignal.update((form) => ({
      ...form,
      imageAssetIds: form.imageAssetIds.includes(id)
        ? form.imageAssetIds.filter((value) => value !== id)
        : [...form.imageAssetIds, id],
    }));
  }

  async submitModal(): Promise<void> {
    if (!this.session.accessToken()) {
      this.setFeedback('pages.admin.technologies.feedback.missingSession');
      return;
    }
    const mode = this.modalMode();
    if (mode === 'create' || mode === 'update') {
      const result = buildTechnologiesMutationPayload(this.form());
      if (!result.isValid) {
        this.setFeedback(result.errorKey);
        return;
      }
      await this.submitUpsert(result.payload);
    } else if (mode === 'delete') await this.submitDelete();
  }

  private async loadWorkspace(
    page = this.pagination().page,
    search = this.searchQuery(),
  ): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    try {
      const [response, images] = await Promise.all([
        firstValueFrom(this.service.getAll(page, this.pagination().pageSize, search)),
        firstValueFrom(this.imagesService.getAll(1, 100)),
      ]);
      this.recordsSignal.set(response.data);
      this.paginationSignal.set(response.pagination);
      this.imagesSignal.set(images.data);
    } catch {
      this.errorSignal.set('pages.admin.technologies.feedback.loadError');
      this.toast.showError('pages.admin.technologies.feedback.loadError');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: Parameters<TechnologiesService['create']>[0]): Promise<void> {
    this.submittingSignal.set(true);
    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.service.create(payload));
        this.toast.showSuccess('pages.admin.technologies.feedback.created');
      } else if (this.selectedTechnology()) {
        await firstValueFrom(this.service.update(this.selectedTechnology()!.id, payload));
        this.toast.showSuccess('pages.admin.technologies.feedback.updated');
      } else {
        this.setFeedback('pages.admin.technologies.feedback.selectionRequired');
        return;
      }
      this.closeModal();
      await this.loadWorkspace();
    } catch {
      this.setFeedback('pages.admin.technologies.feedback.saveError');
    } finally {
      this.submittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const item = this.selectedTechnology();
    if (!item) {
      this.setFeedback('pages.admin.technologies.feedback.selectionRequired');
      return;
    }
    this.submittingSignal.set(true);
    try {
      await firstValueFrom(this.service.delete(item.id));
      this.closeModal();
      this.toast.showSuccess('pages.admin.technologies.feedback.deleted');
      await this.loadWorkspace(
        this.technologies().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page,
      );
    } catch {
      this.setFeedback('pages.admin.technologies.feedback.deleteError');
    } finally {
      this.submittingSignal.set(false);
    }
  }

  private setFeedback(key: AppTranslationKey): void {
    this.feedbackSignal.set(key);
    this.toast.showError(key);
  }
}
