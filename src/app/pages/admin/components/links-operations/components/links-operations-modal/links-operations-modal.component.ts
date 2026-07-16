import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LinkRecord } from '../../../../../../core/api/admin/links/links-operations.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { OperationsModalComponent } from '../../../../../../shared/operations-modal/operations-modal.component';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  LinkCatalogOptionViewModel,
  LinkOperationsViewModel,
  LinksOperationsFormValue,
  LinksOperationsModalMode,
} from '../../links-operations.types';

@Component({
  selector: 'app-links-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent],
  templateUrl: './links-operations-modal.component.html',
  styleUrl: './links-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksOperationsModalComponent {
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.links.modal.create.title',
  );
  readonly modalMode = input<LinksOperationsModalMode | null>(null);
  readonly links = input<readonly LinkOperationsViewModel[]>([]);
  readonly selectedLink = input<LinkRecord | null>(null);
  readonly form = input<LinksOperationsFormValue>({
    url: '',
    labelPt: '',
    labelEn: '',
    descriptionPt: '',
    descriptionEn: '',
    type: '',
    sortOrder: '0',
    isPublished: true,
    projectIds: [],
    experienceIds: [],
    technologyIds: [],
    formationIds: [],
  });
  readonly projectOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly experienceOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly technologyOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly formationOptions = input<readonly LinkCatalogOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(
    createAdminCollectionPagination(),
  );
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly urlChanged = output<string>();
  readonly labelPtChanged = output<string>();
  readonly labelEnChanged = output<string>();
  readonly descriptionPtChanged = output<string>();
  readonly descriptionEnChanged = output<string>();
  readonly typeChanged = output<string>();
  readonly sortOrderChanged = output<string>();
  readonly publicationChanged = output<boolean>();
  readonly projectToggled = output<string>();
  readonly experienceToggled = output<string>();
  readonly technologyToggled = output<string>();
  readonly formationToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

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
    this.modalMode() === 'delete'
      ? 'pages.admin.operations.delete'
      : 'common.actions.save',
  );

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

  protected emitDescriptionPtChange(value: string): void {
    this.descriptionPtChanged.emit(value);
  }

  protected emitDescriptionEnChange(value: string): void {
    this.descriptionEnChanged.emit(value);
  }

  protected emitTypeChange(value: string): void {
    this.typeChanged.emit(value);
  }

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected emitPublicationChange(event: Event): void {
    const customEvent = event as Event & {
      detail?: boolean;
      target: (EventTarget & { checked?: boolean }) | null;
    };

    if (typeof customEvent.detail === 'boolean') {
      this.publicationChanged.emit(customEvent.detail);
      return;
    }

    this.publicationChanged.emit(Boolean(customEvent.target?.checked));
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

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}
