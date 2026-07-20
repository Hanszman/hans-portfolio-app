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
import { TranslatePipe } from '@ngx-translate/core';
import { CustomersOperationsService } from '../../../../core/api/admin/customers/customers-operations.service';
import {
  CustomerMutationPayload,
  CustomerRecord,
} from '../../../../core/api/admin/customers/customers-operations.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { CustomersOperationsModalComponent } from './components/customers-operations-modal/customers-operations-modal.component';
import {
  buildCustomerExperienceOptions,
  buildCustomerImageAssetOptions,
  buildCustomersFormValue,
  buildCustomersMutationPayload,
  buildCustomersViewModels,
} from './helpers/customers-operations.helper';
import {
  CustomersOperationsFormValue,
  CustomersOperationsModalMode,
  createEmptyCustomersOperationsFormValue,
} from './customers-operations.types';

@Component({
  selector: 'app-customers-operations',
  standalone: true,
  imports: [TranslatePipe, InfoStateComponent, CustomersOperationsModalComponent],
  templateUrl: './customers-operations.component.html',
  styleUrl: './customers-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersOperationsComponent implements OnInit {
  private readonly customersOperationsService = inject(CustomersOperationsService);
  private readonly experiencesService = inject(ExperiencesService);
  private readonly imageAssetsOperationsService = inject(ImageAssetsOperationsService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly customersSignal = signal<readonly CustomerRecord[]>([]);
  private readonly experiencesSignal = signal<readonly ExperienceCollectionItemResponse[]>([]);
  private readonly imageAssetsSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  readonly modalModeSignal = signal<CustomersOperationsModalMode | null>(null);
  private readonly selectedCustomerSignal = signal<CustomerRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<CustomersOperationsFormValue>(
    createEmptyCustomersOperationsFormValue(),
  );

  protected readonly customers = computed(() =>
    buildCustomersViewModels(
      this.customersSignal(),
      this.experiencesSignal(),
      this.imageAssetsSignal(),
    ),
  );
  protected readonly experienceOptions = computed(() =>
    buildCustomerExperienceOptions(this.experiencesSignal()),
  );
  protected readonly imageAssetOptions = computed(() =>
    buildCustomerImageAssetOptions(this.imageAssetsSignal()),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/customers');
  protected readonly selectedCustomer = this.selectedCustomerSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasCustomers = computed(
    () => this.pagination().totalItems > 0 && this.customers().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.customers.modal.create.title';
      case 'read':
        return 'pages.admin.customers.modal.read.title';
      case 'pick-update':
        return 'pages.admin.customers.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.customers.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.customers.modal.update.title';
      case 'delete':
        return 'pages.admin.customers.modal.delete.title';
      default:
        return 'pages.admin.customers.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedCustomerSignal.set(null);
    this.formSignal.set(createEmptyCustomersOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasCustomers()) {
      return;
    }

    this.clearModalFeedback();
    this.modalModeSignal.set('read');
  }

  openUpdatePickerModal(): void {
    this.clearModalFeedback();
    this.modalModeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    this.clearModalFeedback();
    this.modalModeSignal.set('pick-delete');
  }

  openUpdateModal(customerId: string): void {
    const customer = this.customersSignal().find((item) => item.id === customerId);

    if (!customer) {
      return;
    }

    this.selectedCustomerSignal.set(customer);
    this.formSignal.set(
      buildCustomersFormValue(
        customer,
        this.experiencesSignal(),
        this.imageAssetsSignal(),
      ),
    );
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(customerId: string): void {
    const customer = this.customersSignal().find((item) => item.id === customerId);

    if (!customer) {
      return;
    }

    this.selectedCustomerSignal.set(customer);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedCustomerSignal.set(null);
    this.clearModalFeedback();
  }

  async goToPage(page: number): Promise<void> {
    if (
      page === this.pagination().page ||
      page < 1 ||
      page > Math.max(this.pagination().totalPages, 1)
    ) {
      return;
    }

    await this.loadWorkspace(page, this.searchQuery());
  }

  async updateSearchQuery(value: string): Promise<void> {
    const normalizedValue = value.trim();

    if (normalizedValue === this.searchQuery()) {
      return;
    }

    this.searchQuerySignal.set(normalizedValue);
    await this.loadWorkspace(1, normalizedValue);
  }

  updateSlug(value: string): void {
    this.patchForm({ slug: value });
  }

  updateName(value: string): void {
    this.patchForm({ name: value });
  }

  updateSummaryPt(value: string): void {
    this.patchForm({ summaryPt: value });
  }

  updateSummaryEn(value: string): void {
    this.patchForm({ summaryEn: value });
  }

  updateHighlight(value: boolean): void {
    this.patchForm({ highlight: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
  }

  updatePublication(value: boolean): void {
    this.patchForm({ isPublished: value });
  }

  toggleExperience(experienceId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      experienceIds: this.toggleSelection(formValue.experienceIds, experienceId),
    }));
  }

  toggleImageAsset(imageAssetId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      imageAssetIds: this.toggleSelection(formValue.imageAssetIds, imageAssetId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.customers.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildCustomersMutationPayload(this.form());

        if (!buildResult.isValid) {
          this.setModalErrorFeedback(buildResult.errorKey);
          return;
        }

        await this.submitUpsert(buildResult.payload);
        return;
      }
      case 'delete':
        await this.submitDelete();
        return;
      default:
        return;
    }
  }

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  private async loadWorkspace(
    page = this.pagination().page,
    search = this.searchQuery(),
  ): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    if (!accessToken) {
      this.loadErrorKeySignal.set('pages.admin.customers.feedback.missingSession');
      this.isLoadingSignal.set(false);
      return;
    }

    try {
      const [customersResponse, experiencesResponse, imageAssetsResponse] = await Promise.all([
        firstValueFrom(
          this.customersOperationsService.getAll(page, this.pagination().pageSize, search),
        ),
        firstValueFrom(this.experiencesService.getExperiences()),
        firstValueFrom(this.imageAssetsOperationsService.getAll(1, 100)),
      ]);

      this.customersSignal.set(customersResponse.data);
      this.paginationSignal.set(customersResponse.pagination);
      this.experiencesSignal.set(experiencesResponse.data);
      this.imageAssetsSignal.set(imageAssetsResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.customers.feedback.loadError');
      this.toastService.showError('pages.admin.customers.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: CustomerMutationPayload): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.customersOperationsService.create(payload));
        this.toastService.showSuccess('pages.admin.customers.feedback.created');
      } else {
        const selectedCustomer = this.selectedCustomer();

        if (!selectedCustomer) {
          this.setModalErrorFeedback('pages.admin.customers.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(
          this.customersOperationsService.update(selectedCustomer.id, payload),
        );
        this.toastService.showSuccess('pages.admin.customers.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.customers.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedCustomer = this.selectedCustomer();

    if (!selectedCustomer) {
      this.setModalErrorFeedback('pages.admin.customers.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.customersOperationsService.delete(selectedCustomer.id));

      const nextPage =
        this.customers().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.toastService.showSuccess('pages.admin.customers.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.customers.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<CustomersOperationsFormValue>): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      ...patch,
    }));
  }

  private toggleSelection(
    selectedIds: readonly string[],
    targetId: string,
  ): readonly string[] {
    return selectedIds.includes(targetId)
      ? selectedIds.filter((selectedId) => selectedId !== targetId)
      : [...selectedIds, targetId];
  }

  private clearModalFeedback(): void {
    this.modalFeedbackKeySignal.set(null);
    this.modalFeedbackToneSignal.set(null);
  }

  private setModalErrorFeedback(feedbackKey: AppTranslationKey): void {
    this.modalFeedbackKeySignal.set(feedbackKey);
    this.modalFeedbackToneSignal.set('error');
    this.toastService.showError(feedbackKey);
  }
}
