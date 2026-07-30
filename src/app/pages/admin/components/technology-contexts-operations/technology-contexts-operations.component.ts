import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TechnologyContextsOperationsService } from '../../../../core/api/technology-contexts/technology-contexts-operations.service';
import { TechnologyContextRecord } from '../../../../core/api/technology-contexts/technology-contexts-operations.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { TranslationService } from '../../../../core/translation/translation.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { OperationsComponent } from '../../../../shared/operations/operations/operations.component';
import {
  AdminCollectionPagination,
  ADMIN_MODAL_PAGE_SIZE,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import {
  createAdminSelectOptionDefinitions,
  translateAdminSelectOptions,
} from '../../helpers/admin.helper';
import { TechnologyContextsOperationsModalComponent } from './components/technology-contexts-operations-modal/technology-contexts-operations-modal.component';
import {
  buildTechnologyContextFormValue,
  buildTechnologyContextMutationPayload,
  TECHNOLOGY_CONTEXT_VALUES,
  TechnologyContextFormValue,
  TechnologyContextsOperationsModalMode,
  createEmptyTechnologyContextFormValue,
} from './technology-contexts-operations.types';
import {
  buildTechnologyContextTechnologyOptions,
  buildTechnologyContextViewModels as mapTechnologyContexts,
} from './helpers/technology-contexts-operations.helper';

@Component({
  selector: 'app-technology-contexts-operations',
  standalone: true,
  imports: [OperationsComponent, TechnologyContextsOperationsModalComponent],
  templateUrl: './technology-contexts-operations.component.html',
  styleUrl: './technology-contexts-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyContextsOperationsComponent implements OnInit {
  private readonly service = inject(TechnologyContextsOperationsService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly session = inject(AdminSessionService);
  private readonly toast = inject(ToastService);
  private readonly translation = inject(TranslationService);
  private readonly recordsSignal = signal<readonly TechnologyContextRecord[]>([]);
  private readonly technologiesSignal = signal<readonly TechnologyCollectionItemResponse[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly loadingSignal = signal(true);
  private readonly submittingSignal = signal(false);
  private readonly errorSignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackSignal = signal<AppTranslationKey | null>(null);
  private readonly modeSignal = signal<TechnologyContextsOperationsModalMode | null>(null);
  private readonly selectedSignal = signal<TechnologyContextRecord | null>(null);
  private readonly searchSignal = signal('');
  private readonly formSignal = signal(createEmptyTechnologyContextFormValue());
  protected readonly records = computed(() =>
    mapTechnologyContexts(this.recordsSignal(), this.translation),
  );
  protected readonly technologyOptions = computed(() =>
    buildTechnologyContextTechnologyOptions(this.technologiesSignal()),
  );
  protected readonly contextOptions = computed(() => {
    this.translation.locale();
    return translateAdminSelectOptions(
      createAdminSelectOptionDefinitions(
        TECHNOLOGY_CONTEXT_VALUES,
        (value) => `pages.admin.technologyContexts.options.${value}` as AppTranslationKey,
      ),
      this.translation.instant.bind(this.translation),
    );
  });
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly isLoading = this.loadingSignal.asReadonly();
  protected readonly isSubmitting = this.submittingSignal.asReadonly();
  protected readonly loadErrorKey = this.errorSignal.asReadonly();
  protected readonly modalFeedbackKey = this.feedbackSignal.asReadonly();
  protected readonly modalMode = this.modeSignal.asReadonly();
  protected readonly selectedRecord = this.selectedSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly searchQuery = this.searchSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/technology-contexts');
  protected readonly hasRecords = computed(
    () => this.pagination().totalItems > 0 && this.records().length > 0,
  );
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    const mode = this.modalMode() ?? 'create';
    const translationMode =
      mode === 'pick-update' ? 'pickUpdate' : mode === 'pick-delete' ? 'pickDelete' : mode;
    return `pages.admin.technologyContexts.modal.${translationMode}.title` as AppTranslationKey;
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    void this.refreshTechnologyOptions();
    this.selectedSignal.set(null);
    this.formSignal.set(createEmptyTechnologyContextFormValue());
    this.modeSignal.set('create');
  }

  openReadModal(): void {
    if (this.hasRecords()) {
      this.modeSignal.set('read');
      void this.loadWorkspace();
    }
  }

  openUpdatePickerModal(): void {
    void this.refreshTechnologyOptions();
    if (this.hasRecords()) this.modeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    void this.refreshTechnologyOptions();
    if (this.hasRecords()) this.modeSignal.set('pick-delete');
  }

  openUpdateModal(id: string): void {
    this.selectRecord(id, 'update');
  }

  openDeleteModal(id: string): void {
    this.selectRecord(id, 'delete');
  }

  private selectRecord(id: string, mode: 'update' | 'delete'): void {
    const record = this.recordsSignal().find((item) => item.id === id);
    if (!record) return;
    this.selectedSignal.set(record);
    this.formSignal.set(buildTechnologyContextFormValue(record));
    this.modeSignal.set(mode);
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

  updateField(field: keyof TechnologyContextFormValue, value: string): void {
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  async submitModal(): Promise<void> {
    if (!this.session.accessToken()) {
      this.setFeedback('pages.admin.technologyContexts.feedback.missingSession');
      return;
    }
    const mode = this.modalMode();
    if (mode === 'create' || mode === 'update') {
      const result = buildTechnologyContextMutationPayload(this.form());
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
      const [response, technologies] = await Promise.all([
        firstValueFrom(this.service.getAll(page, this.pagination().pageSize, search)),
        firstValueFrom(this.technologiesService.getTechnologies()),
      ]);
      this.recordsSignal.set(response.data);
      this.paginationSignal.set(response.pagination);
      this.technologiesSignal.set(technologies.data);
    } catch {
      this.errorSignal.set('pages.admin.technologyContexts.feedback.loadError');
      this.toast.showError('pages.admin.technologyContexts.feedback.loadError');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  private async refreshTechnologyOptions(): Promise<void> {
    try {
      const technologies = await firstValueFrom(this.technologiesService.getTechnologies());
      this.technologiesSignal.set(technologies.data);
    } catch {
      return;
    }
  }

  private async submitUpsert(
    payload: Parameters<TechnologyContextsOperationsService['create']>[0],
  ): Promise<void> {
    this.submittingSignal.set(true);
    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.service.create(payload));
        this.toast.showSuccess('pages.admin.technologyContexts.feedback.created');
      } else if (this.selectedRecord()) {
        await firstValueFrom(this.service.update(this.selectedRecord()!.id, payload));
        this.toast.showSuccess('pages.admin.technologyContexts.feedback.updated');
      }
      this.closeModal();
      await this.loadWorkspace();
    } catch {
      this.setFeedback('pages.admin.technologyContexts.feedback.saveError');
    } finally {
      this.submittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const record = this.selectedRecord();
    if (!record) return;
    this.submittingSignal.set(true);
    try {
      await firstValueFrom(this.service.delete(record.id));
      this.closeModal();
      this.toast.showSuccess('pages.admin.technologyContexts.feedback.deleted');
      await this.loadWorkspace(
        this.records().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page,
      );
    } catch {
      this.setFeedback('pages.admin.technologyContexts.feedback.deleteError');
    } finally {
      this.submittingSignal.set(false);
    }
  }

  private setFeedback(key: AppTranslationKey): void {
    this.feedbackSignal.set(key);
    this.toast.showError(key);
  }
}
