import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CustomerRecord } from '../../../../../../core/api/customers/customers.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import { OperationsRelationPickerComponent } from '../../../../../../shared/operations/operations-relation-picker/operations-relation-picker.component';
import {
  OperationsDetailedItemViewModel,
  OperationsItemViewModel,
} from '../../../../../../shared/operations/operations.types';
import {
  createAdminFieldLabelResolver,
  resolveAdminLocalizedValue,
  trackAdminItemById,
} from '../../../../helpers/admin.helper';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  CUSTOMERS_OPERATIONS_FIELDS,
  CustomerExperienceOptionViewModel,
  CustomerImageAssetOptionViewModel,
  CustomerOperationsViewModel,
  CustomersOperationsFormValue,
  CustomersOperationsModalMode,
  createEmptyCustomersOperationsFormValue,
} from '../../customers-operations.types';

@Component({
  selector: 'app-customers-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, OperationsRelationPickerComponent],
  templateUrl: './customers-operations-modal.component.html',
  styleUrl: './customers-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.customers.modal.create.title');
  readonly modalMode = input<CustomersOperationsModalMode | null>(null);
  readonly customers = input<readonly CustomerOperationsViewModel[]>([]);
  readonly selectedCustomer = input<CustomerRecord | null>(null);
  readonly form = input<CustomersOperationsFormValue>(createEmptyCustomersOperationsFormValue());
  readonly experienceOptions = input<readonly CustomerExperienceOptionViewModel[]>([]);
  readonly imageAssetOptions = input<readonly CustomerImageAssetOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly slugChanged = output<string>();
  readonly nameChanged = output<string>();
  readonly summaryPtChanged = output<string>();
  readonly summaryEnChanged = output<string>();
  readonly summaryEsChanged = output<string>();
  readonly highlightChanged = output<boolean>();
  readonly sortOrderChanged = output<string>();
  readonly experienceToggled = output<string>();
  readonly imageAssetToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = CUSTOMERS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.customers.modal.read.description';
      case 'pick-update':
        return 'pages.admin.customers.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.customers.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.customers.modal.delete.description';
      default:
        return null;
    }
  });

  protected readonly showPagination = computed(() => {
    const mode = this.modalMode();
    return mode === 'read' || mode === 'pick-update' || mode === 'pick-delete';
  });

  protected readonly showSubmit = computed(() => {
    const mode = this.modalMode();
    return mode === 'create' || mode === 'update' || mode === 'delete';
  });

  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete' ? 'pages.admin.operations.delete' : 'common.actions.save',
  );
  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() =>
    this.customers().map((customer) => ({
      id: customer.id,
      title: `${customer.name} (${customer.slug})`,
      subtitle: resolveAdminLocalizedValue(
        this.translation.locale(), customer.summaryPt, customer.summaryEn, customer.summaryEs,
      ),
    })),
  );
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () => {
      this.translation.locale();
      const emptyRelations = this.translation.instant('pages.admin.customers.card.emptyRelations');

      return this.customers().map((customer) => ({
        id: customer.id,
        title: customer.slug,
        subtitle: customer.name,
        fields: [
          { labelKey: 'common.fields.slug', value: customer.slug },
          { labelKey: 'pages.admin.customers.card.name', value: customer.name },
          {
            labelKey: 'pages.admin.operations.localized.summary',
            value: resolveAdminLocalizedValue(
              this.translation.locale(), customer.summaryPt, customer.summaryEn, customer.summaryEs,
            ),
          },
          {
            labelKey: 'pages.admin.customers.card.highlight',
            value: this.translation.instant(
              customer.highlight
                ? 'pages.admin.customers.fields.highlight.enabled'
                : 'pages.admin.customers.fields.highlight.disabled',
            ),
          },
          { labelKey: 'common.fields.sortOrder', value: customer.sortOrderLabel },
          {
            labelKey: 'pages.admin.customers.card.experiences',
            value: customer.experienceLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.customers.card.imageAssets',
            value: customer.imageAssetLabels.join(', ') || emptyRelations,
          },
        ],
      }));
    },
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const customer = this.selectedCustomer();
    return customer
      ? {
          id: customer.id,
          title: `${customer.name} (${customer.slug})`,
          subtitle: resolveAdminLocalizedValue(
            this.translation.locale(), customer.summaryPt, customer.summaryEn, customer.summaryEs,
          ),
        }
      : null;
  });

  protected requestClose(): void {
    this.closed.emit();
  }

  protected submit(): void {
    this.submitted.emit();
  }

  protected emitSlugChange(value: string): void {
    this.slugChanged.emit(value);
  }

  protected emitNameChange(value: string): void {
    this.nameChanged.emit(value);
  }

  protected emitSummaryPtChange(value: string): void {
    this.summaryPtChanged.emit(value);
  }

  protected emitSummaryEnChange(value: string): void {
    this.summaryEnChanged.emit(value);
  }

  protected emitSummaryEsChange(value: string): void {
    this.summaryEsChanged.emit(value);
  }

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected emitHighlightChange(event: Event): void {
    const customEvent = event as Event & {
      detail?: boolean;
      target: (EventTarget & { checked?: boolean }) | null;
    };

    if (typeof customEvent.detail === 'boolean') {
      this.highlightChanged.emit(customEvent.detail);
      return;
    }

    this.highlightChanged.emit(Boolean(customEvent.target?.checked));
  }

  protected toggleExperience(experienceId: string): void {
    this.experienceToggled.emit(experienceId);
  }

  protected toggleImageAsset(imageAssetId: string): void {
    this.imageAssetToggled.emit(imageAssetId);
  }

  protected selectCustomerForUpdate(customerId: string): void {
    this.updateSelected.emit(customerId);
  }

  protected selectCustomerForDelete(customerId: string): void {
    this.deleteSelected.emit(customerId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isExperienceSelected(experienceId: string): boolean {
    return this.form().experienceIds.includes(experienceId);
  }

  protected isImageAssetSelected(imageAssetId: string): boolean {
    return this.form().imageAssetIds.includes(imageAssetId);
  }
}
