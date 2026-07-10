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
import { TagsApiService } from '../../../../core/api/admin/tags/tags-api.service';
import { TagMutationPayload, TagRecord } from '../../../../core/api/admin/tags/tags-api.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { TagsModalComponent } from './components/tags-modal/tags-modal.component';
import {
  buildTagCatalogOptions,
  buildTagsFormValue,
  buildTagsMutationPayload,
  buildTagsViewModels,
} from './helpers/tags.helper';
import {
  TagsFormValue,
  TagsModalMode,
  createEmptyTagsFormValue,
} from './tags.types';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [TranslatePipe, InfoStateComponent, TagsModalComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements OnInit {
  private readonly tagsApiService = inject(TagsApiService);
  private readonly projectsService = inject(ProjectsService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly adminSessionService = inject(AdminSessionService);

  private readonly tagsSignal = signal<readonly TagRecord[]>([]);
  private readonly projectsSignal = signal<readonly ProjectCollectionItemResponse[]>([]);
  private readonly technologiesSignal = signal<
    readonly TechnologyCollectionItemResponse[]
  >([]);
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly isReadVisibleSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalModeSignal = signal<TagsModalMode | null>(null);
  private readonly selectedTagSignal = signal<TagRecord | null>(null);
  private readonly formSignal = signal<TagsFormValue>(createEmptyTagsFormValue());

  protected readonly tags = computed(() =>
    buildTagsViewModels(
      this.tagsSignal(),
      this.projectsSignal(),
      this.technologiesSignal(),
    ),
  );
  protected readonly projectOptions = computed(() =>
    buildTagCatalogOptions(this.projectsSignal()),
  );
  protected readonly technologyOptions = computed(() =>
    buildTagCatalogOptions(this.technologiesSignal()),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly isReadVisible = this.isReadVisibleSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly feedbackKey = this.feedbackKeySignal.asReadonly();
  protected readonly feedbackTone = this.feedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly selectedTag = this.selectedTagSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasTags = computed(() => this.tags().length > 0);
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.tags.modal.create.title';
      case 'pick-update':
        return 'pages.admin.tags.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.tags.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.tags.modal.update.title';
      case 'delete':
        return 'pages.admin.tags.modal.delete.title';
      default:
        return 'pages.admin.tags.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedTagSignal.set(null);
    this.formSignal.set(createEmptyTagsFormValue());
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('create');
  }

  openUpdatePickerModal(): void {
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('pick-delete');
  }

  openUpdateModal(tagId: string): void {
    const tag = this.tagsSignal().find((item) => item.id === tagId);

    if (!tag) {
      return;
    }

    this.selectedTagSignal.set(tag);
    this.formSignal.set(buildTagsFormValue(tag, this.projectsSignal()));
    this.modalModeSignal.set('update');
  }

  openDeleteModal(tagId: string): void {
    const tag = this.tagsSignal().find((item) => item.id === tagId);

    if (!tag) {
      return;
    }

    this.selectedTagSignal.set(tag);
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedTagSignal.set(null);
  }

  toggleReadVisibility(): void {
    if (!this.hasTags()) {
      return;
    }

    this.isReadVisibleSignal.update((currentValue) => !currentValue);
  }

  updateSlug(value: string): void {
    this.patchForm({ slug: value });
  }

  updateNamePt(value: string): void {
    this.patchForm({ namePt: value });
  }

  updateNameEn(value: string): void {
    this.patchForm({ nameEn: value });
  }

  updateType(value: string): void {
    this.patchForm({ type: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
  }

  toggleProject(projectId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      projectIds: this.toggleSelection(formValue.projectIds, projectId),
    }));
  }

  toggleTechnology(technologyId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      technologyIds: this.toggleSelection(formValue.technologyIds, technologyId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setErrorFeedback('pages.admin.tags.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildTagsMutationPayload(this.form());

        if (!buildResult.isValid) {
          this.setErrorFeedback(buildResult.errorKey);
          return;
        }

        await this.submitUpsert(accessToken, buildResult.payload);
        return;
      }
      case 'delete':
        await this.submitDelete(accessToken);
        return;
      default:
        return;
    }
  }

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  private async loadWorkspace(): Promise<void> {
    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    try {
      const [tagsResponse, projectsResponse, technologiesResponse] = await Promise.all([
        firstValueFrom(this.tagsApiService.getAll()),
        firstValueFrom(this.projectsService.getProjects()),
        firstValueFrom(this.technologiesService.getTechnologies()),
      ]);

      this.tagsSignal.set(tagsResponse.data);
      this.projectsSignal.set(projectsResponse.data);
      this.technologiesSignal.set(technologiesResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.tags.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(
    accessToken: string,
    payload: TagMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.tagsApiService.create(accessToken, payload));
        this.setSuccessFeedback('pages.admin.tags.feedback.created');
      } else {
        const selectedTag = this.selectedTag();

        if (!selectedTag) {
          this.setErrorFeedback('pages.admin.tags.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(
          this.tagsApiService.update(accessToken, selectedTag.id, payload),
        );
        this.setSuccessFeedback('pages.admin.tags.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace();
    } catch {
      this.setErrorFeedback('pages.admin.tags.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(accessToken: string): Promise<void> {
    const selectedTag = this.selectedTag();

    if (!selectedTag) {
      this.setErrorFeedback('pages.admin.tags.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.tagsApiService.delete(accessToken, selectedTag.id));
      this.closeModal();
      this.setSuccessFeedback('pages.admin.tags.feedback.deleted');
      await this.loadWorkspace();
    } catch {
      this.setErrorFeedback('pages.admin.tags.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<TagsFormValue>): void {
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

  private setSuccessFeedback(feedbackKey: AppTranslationKey): void {
    this.feedbackKeySignal.set(feedbackKey);
    this.feedbackToneSignal.set('success');
  }

  private setErrorFeedback(feedbackKey: AppTranslationKey): void {
    this.feedbackKeySignal.set(feedbackKey);
    this.feedbackToneSignal.set('error');
  }
}
