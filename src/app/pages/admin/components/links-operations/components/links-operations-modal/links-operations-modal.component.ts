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
import { LinkRecord } from '../../../../../../core/api/links/links.types';
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
  resolveAdminSelectValue,
  trackAdminItemById,
} from '../../../../helpers/admin.helper';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  LINKS_OPERATIONS_FIELDS,
  LinkCatalogOptionViewModel,
  LinkOperationsViewModel,
  LinkTypeOptionViewModel,
  LinksOperationsFormValue,
  LinksOperationsModalMode,
} from '../../links-operations.types';

@Component({
  selector: 'app-links-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, OperationsRelationPickerComponent],
  templateUrl: './links-operations-modal.component.html',
  styleUrl: './links-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.links.modal.create.title');
  readonly modalMode = input<LinksOperationsModalMode | null>(null);
  readonly links = input<readonly LinkOperationsViewModel[]>([]);
  readonly selectedLink = input<LinkRecord | null>(null);
  readonly form = input<LinksOperationsFormValue>({
    url: '',
    labelPt: '',
    labelEn: '',
    labelEs: '',
    descriptionPt: '',
    descriptionEn: '',
    descriptionEs: '',
    type: '',
    sortOrder: '0',
    projectIds: [],
    experienceIds: [],
    technologyIds: [],
    formationIds: [],
  });
  readonly projectOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly experienceOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly technologyOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly formationOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly linkTypeOptions = input<readonly LinkTypeOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly urlChanged = output<string>();
  readonly labelPtChanged = output<string>();
  readonly labelEnChanged = output<string>();
  readonly labelEsChanged = output<string>();
  readonly descriptionPtChanged = output<string>();
  readonly descriptionEnChanged = output<string>();
  readonly descriptionEsChanged = output<string>();
  readonly typeChanged = output<string>();
  readonly sortOrderChanged = output<string>();
  readonly projectToggled = output<string>();
  readonly experienceToggled = output<string>();
  readonly technologyToggled = output<string>();
  readonly formationToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = LINKS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.links.modal.read.description';
      case 'pick-update':
        return 'pages.admin.links.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.links.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.links.modal.delete.description';
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
  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() => {
    this.translation.locale();
    const emptyText = this.translation.instant('pages.admin.links.card.emptyText');

    return this.links().map((link) => ({
      id: link.id,
      title:
        resolveAdminLocalizedValue(
          this.translation.locale(), link.labelPt, link.labelEn, link.labelEs,
        ) || emptyText,
      subtitle: link.url,
    }));
  });
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () => {
      this.translation.locale();
      const emptyText = this.translation.instant('pages.admin.links.card.emptyText');
      const emptyRelations = this.translation.instant('pages.admin.links.card.emptyRelations');

      return this.links().map((link) => ({
        id: link.id,
        title: link.url,
        subtitle:
          resolveAdminLocalizedValue(
            this.translation.locale(), link.labelPt, link.labelEn, link.labelEs,
          ) || emptyText,
        fields: [
          { labelKey: 'pages.admin.links.card.url', value: link.url, title: link.url },
          {
            labelKey: 'pages.admin.operations.localized.label',
            value:
              resolveAdminLocalizedValue(
                this.translation.locale(), link.labelPt, link.labelEn, link.labelEs,
              ) || emptyText,
          },
          {
            labelKey: 'pages.admin.operations.localized.description',
            value:
              resolveAdminLocalizedValue(
                this.translation.locale(), link.descriptionPt, link.descriptionEn,
                link.descriptionEs,
              ) || emptyText,
          },
          { labelKey: 'pages.admin.links.card.type', value: link.type },
          { labelKey: 'common.fields.sortOrder', value: link.sortOrderLabel },
          {
            labelKey: 'common.entities.projects',
            value: link.projectLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.links.card.experiences',
            value: link.experienceLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'common.entities.technologies',
            value: link.technologyLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.links.card.formations',
            value: link.formationLabels.join(', ') || emptyRelations,
          },
        ],
      }));
    },
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    this.translation.locale();
    const link = this.selectedLink();
    return link
      ? {
          id: link.id,
          title:
            resolveAdminLocalizedValue(
              this.translation.locale(), link.labelPt, link.labelEn, link.labelEs,
            ) || this.translation.instant('pages.admin.links.card.emptyText'),
          subtitle: link.url,
        }
      : null;
  });

  protected requestClose(): void {
    this.closed.emit();
  }

  protected submit(): void {
    this.submitted.emit();
  }

  protected emitUrlChange(value: string): void {
    this.urlChanged.emit(value);
  }

  protected emitLabelPtChange(value: string): void {
    this.labelPtChanged.emit(value);
  }

  protected emitLabelEnChange(value: string): void {
    this.labelEnChanged.emit(value);
  }

  protected emitLabelEsChange(value: string): void {
    this.labelEsChanged.emit(value);
  }

  protected emitDescriptionPtChange(value: string): void {
    this.descriptionPtChanged.emit(value);
  }

  protected emitDescriptionEnChange(value: string): void {
    this.descriptionEnChanged.emit(value);
  }

  protected emitDescriptionEsChange(value: string): void {
    this.descriptionEsChanged.emit(value);
  }

  protected emitTypeChange(value: string): void {
    this.typeChanged.emit(value);
  }

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected toggleProject(projectId: string): void {
    this.projectToggled.emit(projectId);
  }

  protected toggleExperience(experienceId: string): void {
    this.experienceToggled.emit(experienceId);
  }

  protected toggleTechnology(technologyId: string): void {
    this.technologyToggled.emit(technologyId);
  }

  protected toggleFormation(formationId: string): void {
    this.formationToggled.emit(formationId);
  }

  protected selectLinkForUpdate(linkId: string): void {
    this.updateSelected.emit(linkId);
  }

  protected selectLinkForDelete(linkId: string): void {
    this.deleteSelected.emit(linkId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isProjectSelected(projectId: string): boolean {
    return this.form().projectIds.includes(projectId);
  }

  protected isExperienceSelected(experienceId: string): boolean {
    return this.form().experienceIds.includes(experienceId);
  }

  protected isTechnologySelected(technologyId: string): boolean {
    return this.form().technologyIds.includes(technologyId);
  }

  protected isFormationSelected(formationId: string): boolean {
    return this.form().formationIds.includes(formationId);
  }
}
