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
import { ImageAssetRecord } from '../../../../../../core/api/image-assets/image-assets.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import {
  OperationsDetailedItemViewModel,
  OperationsItemViewModel,
} from '../../../../../../shared/operations/operations.types';
import { OperationsRelationPickerComponent } from '../../../../../../shared/operations/operations-relation-picker/operations-relation-picker.component';
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
  IMAGE_ASSETS_OPERATIONS_FIELDS,
  ImageAssetCatalogOptionViewModel,
  ImageAssetKindOptionViewModel,
  ImageAssetOperationsViewModel,
  ImageAssetsOperationsFormValue,
  ImageAssetsOperationsModalMode,
  createEmptyImageAssetsOperationsFormValue,
} from '../../image-assets-operations.types';

@Component({
  selector: 'app-image-assets-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, OperationsRelationPickerComponent],
  templateUrl: './image-assets-operations-modal.component.html',
  styleUrl: './image-assets-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageAssetsOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.imageAssets.modal.create.title');
  readonly modalMode = input<ImageAssetsOperationsModalMode | null>(null);
  readonly imageAssets = input<readonly ImageAssetOperationsViewModel[]>([]);
  readonly selectedImageAsset = input<ImageAssetRecord | null>(null);
  readonly form = input<ImageAssetsOperationsFormValue>(
    createEmptyImageAssetsOperationsFormValue(),
  );
  readonly projectOptions = input<readonly ImageAssetCatalogOptionViewModel[]>([]);
  readonly experienceOptions = input<readonly ImageAssetCatalogOptionViewModel[]>([]);
  readonly technologyOptions = input<readonly ImageAssetCatalogOptionViewModel[]>([]);
  readonly imageAssetKindOptions = input<readonly ImageAssetKindOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly fileNameChanged = output<string>();
  readonly filePathChanged = output<string>();
  readonly folderChanged = output<string>();
  readonly kindChanged = output<string>();
  readonly altPtChanged = output<string>();
  readonly altEnChanged = output<string>();
  readonly altEsChanged = output<string>();
  readonly captionPtChanged = output<string>();
  readonly captionEnChanged = output<string>();
  readonly captionEsChanged = output<string>();
  readonly mimeTypeChanged = output<string>();
  readonly widthChanged = output<string>();
  readonly heightChanged = output<string>();
  readonly sortOrderChanged = output<string>();
  readonly projectToggled = output<string>();
  readonly experienceToggled = output<string>();
  readonly technologyToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = IMAGE_ASSETS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.imageAssets.modal.read.description';
      case 'pick-update':
        return 'pages.admin.imageAssets.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.imageAssets.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.imageAssets.modal.delete.description';
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
    this.imageAssets().map((imageAsset) => ({
      id: imageAsset.id,
      title: `${imageAsset.fileName} (${imageAsset.kind})`,
      subtitle: imageAsset.filePath,
      image: {
        url: imageAsset.filePath,
        alt:
          resolveAdminLocalizedValue(
            this.translation.locale(), imageAsset.altPt, imageAsset.altEn, imageAsset.altEs,
          ) || imageAsset.fileName,
        title: imageAsset.filePath,
      },
    })),
  );
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () => {
      this.translation.locale();
      const emptyText = this.translation.instant('pages.admin.imageAssets.card.emptyText');
      const emptyRelations = this.translation.instant(
        'pages.admin.imageAssets.card.emptyRelations',
      );

      return this.imageAssets().map((imageAsset) => ({
        id: imageAsset.id,
        title: imageAsset.fileName,
        subtitle: imageAsset.kind,
        image: {
          url: imageAsset.filePath,
          alt:
            resolveAdminLocalizedValue(
              this.translation.locale(), imageAsset.altPt, imageAsset.altEn, imageAsset.altEs,
            ) || imageAsset.fileName,
          title: imageAsset.filePath,
        },
        fields: [
          {
            labelKey: 'pages.admin.imageAssets.card.fileName',
            value: imageAsset.fileName,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.filePath',
            value: imageAsset.filePath,
            title: imageAsset.filePath,
          },
          { labelKey: 'pages.admin.imageAssets.card.folder', value: imageAsset.folder },
          { labelKey: 'pages.admin.imageAssets.card.kind', value: imageAsset.kind },
          {
            labelKey: 'pages.admin.imageAssets.card.mimeType',
            value: imageAsset.mimeType || emptyText,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.dimensions',
            value: imageAsset.dimensionsLabel,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.sortOrder',
            value: imageAsset.sortOrderLabel,
          },
          {
            labelKey: 'pages.admin.operations.localized.alt',
            value:
              resolveAdminLocalizedValue(
                this.translation.locale(), imageAsset.altPt, imageAsset.altEn, imageAsset.altEs,
              ) || emptyText,
          },
          {
            labelKey: 'pages.admin.operations.localized.caption',
            value:
              resolveAdminLocalizedValue(
                this.translation.locale(), imageAsset.captionPt, imageAsset.captionEn,
                imageAsset.captionEs,
              ) || emptyText,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.projects',
            value: imageAsset.projectLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.experiences',
            value: imageAsset.experienceLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.technologies',
            value: imageAsset.technologyLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.formations',
            value: imageAsset.formationLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.spokenLanguages',
            value: imageAsset.spokenLanguageLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.customers',
            value: imageAsset.customerLabels.join(', ') || emptyRelations,
          },
          {
            labelKey: 'pages.admin.imageAssets.card.jobs',
            value: imageAsset.jobLabels.join(', ') || emptyRelations,
          },
        ],
      }));
    },
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const imageAsset = this.selectedImageAsset();
    return imageAsset
      ? {
          id: imageAsset.id,
          title: `${imageAsset.fileName} (${imageAsset.kind})`,
          subtitle: imageAsset.filePath,
          image: {
            url: imageAsset.filePath,
            alt:
              resolveAdminLocalizedValue(
                this.translation.locale(), imageAsset.altPt, imageAsset.altEn, imageAsset.altEs,
              ) || imageAsset.fileName,
            title: imageAsset.filePath,
          },
        }
      : null;
  });

  protected requestClose(): void {
    this.closed.emit();
  }

  protected submit(): void {
    this.submitted.emit();
  }

  protected emitFileNameChange(value: string): void {
    this.fileNameChanged.emit(value);
  }

  protected emitFilePathChange(value: string): void {
    this.filePathChanged.emit(value);
  }

  protected emitFolderChange(value: string): void {
    this.folderChanged.emit(value);
  }

  protected emitKindChange(value: string): void {
    this.kindChanged.emit(value);
  }

  protected emitAltPtChange(value: string): void {
    this.altPtChanged.emit(value);
  }

  protected emitAltEnChange(value: string): void {
    this.altEnChanged.emit(value);
  }

  protected emitAltEsChange(value: string): void {
    this.altEsChanged.emit(value);
  }

  protected emitCaptionPtChange(value: string): void {
    this.captionPtChanged.emit(value);
  }

  protected emitCaptionEnChange(value: string): void {
    this.captionEnChanged.emit(value);
  }

  protected emitCaptionEsChange(value: string): void {
    this.captionEsChanged.emit(value);
  }

  protected emitMimeTypeChange(value: string): void {
    this.mimeTypeChanged.emit(value);
  }

  protected emitWidthChange(value: string): void {
    this.widthChanged.emit(value);
  }

  protected emitHeightChange(value: string): void {
    this.heightChanged.emit(value);
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

  protected selectImageAssetForUpdate(imageAssetId: string): void {
    this.updateSelected.emit(imageAssetId);
  }

  protected selectImageAssetForDelete(imageAssetId: string): void {
    this.deleteSelected.emit(imageAssetId);
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
}
