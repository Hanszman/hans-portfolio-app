import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageAssetsService } from '../../../../core/api/image-assets/image-assets.service';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyAdminRecord } from '../../../../core/api/technologies/technologies.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { FormationsService } from '../../../../core/api/formations/formations.service';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { TechnologiesOperationsComponent } from './technologies-operations.component';
import { buildTechnologiesFormValue } from './technologies-operations.types';

const record = (overrides: Partial<TechnologyAdminRecord> = {}): TechnologyAdminRecord => ({
  id: 'technology-1',
  slug: 'angular',
  name: 'Angular',
  stack: 'FRONT_END',
  type: 'FRAMEWORKS',
  level: 'ADVANCED',
  frequency: 'FREQUENT',
  highlight: true,
  sortOrder: 1,
  imageAssetIds: ['image-1'],
  ...overrides,
});
const response = (data: TechnologyAdminRecord[] = [record()], page = 1) => ({
  data,
  pagination: {
    page,
    pageSize: 5,
    totalItems: data.length,
    totalPages: data.length ? 1 : 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});
const imageResponse = () => ({
  data: [
    {
      id: 'image-1',
      fileName: 'angular.png',
      filePath: '/assets/img/skills/angular.png',
      kind: 'ICON',
    },
  ],
  pagination: {
    page: 1,
    pageSize: 100,
    totalItems: 1,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});
interface TechnologiesTestApi {
  openCreateModal(): void;
  openReadModal(): void;
  openUpdatePickerModal(): void;
  openDeletePickerModal(): void;
  openUpdateModal(id: string): void;
  openDeleteModal(id: string): void;
  closeModal(): void;
  updateField(field: string, value: string | boolean): void;
  toggleImageAsset(id: string): void;
  toggleProject(id: string): void;
  toggleExperience(id: string): void;
  toggleFormation(id: string): void;
  submitModal(): Promise<void>;
  goToPage(page: number): Promise<void>;
  updateSearchQuery(value: string): Promise<void>;
  modalMode(): string | null;
  selectedTechnology(): TechnologyAdminRecord | null;
  modalFeedbackKey(): string | null;
  modeSignal: { set(value: string): void };
  selectedSignal: { set(value: TechnologyAdminRecord | null): void };
  recordsSignal: { set(value: readonly TechnologyAdminRecord[]): void };
  paginationSignal: {
    set(value: {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }): void;
  };
  loadWorkspace(): Promise<void>;
}

describe('TechnologiesOperationsComponent', () => {
  let fixture: ComponentFixture<TechnologiesOperationsComponent>;
  let service: jasmine.SpyObj<TechnologiesService>;
  let images: jasmine.SpyObj<ImageAssetsService>;
  let projects: jasmine.SpyObj<ProjectsService>;
  let experiences: jasmine.SpyObj<ExperiencesService>;
  let formations: jasmine.SpyObj<FormationsService>;
  let toast: jasmine.SpyObj<ToastService>;
  let session: { accessToken: jasmine.Spy<() => string | null> };
  const settle = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    for (let index = 0; index < 5; index += 1) {
      await Promise.resolve();
    }
    fixture.detectChanges();
  };

  beforeAll(() => {
    for (const tag of [
      'hans-button',
      'hans-input',
      'hans-select-option',
      'hans-toggle',
      'hans-modal',
      'hans-loading',
    ])
      if (!customElements.get(tag)) customElements.define(tag, class extends HTMLElement {});
  });

  beforeEach(async () => {
    service = jasmine.createSpyObj<TechnologiesService>('TechnologiesService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    images = jasmine.createSpyObj<ImageAssetsService>('ImageAssetsService', [
      'getAll',
    ]);
    projects = jasmine.createSpyObj<ProjectsService>('ProjectsService', ['getProjects']);
    experiences = jasmine.createSpyObj<ExperiencesService>('ExperiencesService', [
      'getExperiences',
    ]);
    formations = jasmine.createSpyObj<FormationsService>('FormationsService', ['getAll']);
    toast = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);
    session = { accessToken: jasmine.createSpy('accessToken').and.returnValue('token') };
    service.getAll.and.returnValue(of(response()));
    service.create.and.returnValue(of(record()));
    service.update.and.returnValue(of(record()));
    service.delete.and.returnValue(of(void 0));
    images.getAll.and.returnValue(of(imageResponse()));
    projects.getProjects.and.returnValue(of({ data: [], pagination: response().pagination }));
    experiences.getExperiences.and.returnValue(
      of({ data: [], pagination: response().pagination }),
    );
    formations.getAll.and.returnValue(of({ data: [], pagination: response().pagination }));
    await TestBed.configureTestingModule({
      imports: [TechnologiesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TechnologiesService, useValue: service },
        { provide: ImageAssetsService, useValue: images },
        { provide: ProjectsService, useValue: projects },
        { provide: ExperiencesService, useValue: experiences },
        { provide: FormationsService, useValue: formations },
        { provide: AdminSessionService, useValue: session },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TechnologiesOperationsComponent);
  });

  it('uses empty select values for legacy technology records without normalized taxonomy', () => {
    const legacyRecord = record({ stack: undefined, type: undefined });

    expect(buildTechnologiesFormValue(legacyRecord)).toEqual(
      jasmine.objectContaining({ stack: '', type: '' }),
    );
  });

  it('loads and renders the workspace', async () => {
    await settle();
    expect(service.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(images.getAll).toHaveBeenCalledWith(1, 100);
    expect(fixture.nativeElement.textContent).toContain('Technologies');
    expect(fixture.nativeElement.textContent).toContain(
      createAdminEntityEndpointLabel('/technologies'),
    );
  });

  it('runs create, update and delete workflows', async () => {
    await settle();
    const component = fixture.componentInstance as unknown as TechnologiesTestApi;
    component.openCreateModal();
    component.updateField('slug', 'new-tech');
    component.updateField('name', 'New tech');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.requiredStack');
    component.updateField('stack', 'FRONT_END');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.requiredType');
    component.updateField('type', 'FRAMEWORKS');
    component.updateField('sortOrder', '2');
    component.toggleImageAsset('image-1');
    component.toggleImageAsset('image-1');
    component.toggleProject('project-1');
    component.toggleProject('project-1');
    component.toggleExperience('experience-1');
    component.toggleExperience('experience-1');
    component.toggleFormation('formation-1');
    component.toggleFormation('formation-1');
    await component.submitModal();
    expect(service.create).toHaveBeenCalled();
    component.openUpdateModal('technology-1');
    component.updateField('name', 'Updated');
    await component.submitModal();
    expect(service.update).toHaveBeenCalledWith('technology-1', jasmine.anything());
    component.recordsSignal.set([
      record(),
      record({ id: 'technology-2', slug: 'react', name: 'React' }),
    ]);
    component.openDeleteModal('technology-1');
    await component.submitModal();
    expect(service.delete).toHaveBeenCalledWith('technology-1');
    component.recordsSignal.set([record()]);
    component.paginationSignal.set({
      page: 2,
      pageSize: 5,
      totalItems: 6,
      totalPages: 2,
      hasPreviousPage: true,
      hasNextPage: false,
    });
    component.openDeleteModal('technology-1');
    await component.submitModal();
  });

  it('maps every relation catalog and applies readable fallbacks', async () => {
    await settle();
    const component = fixture.componentInstance as unknown as {
      projectsSignal: { set(value: readonly unknown[]): void };
      experiencesSignal: { set(value: readonly unknown[]): void };
      formationsSignal: { set(value: readonly unknown[]): void };
      projectOptions(): readonly { id: string; title: string; subtitle: string }[];
      experienceOptions(): readonly { id: string; title: string; subtitle: string }[];
      formationOptions(): readonly { id: string; title: string; subtitle: string }[];
    };

    component.projectsSignal.set([
      { id: 'project-1', titlePt: 'Portfolio', slug: 'portfolio' },
    ]);
    component.experiencesSignal.set([
      { id: 'experience-1', titlePt: 'Developer', companyName: 'Acme' },
    ]);
    component.formationsSignal.set([
      { id: 'formation-1', titlePt: 'Information Systems', institution: 'PUC Minas' },
    ]);

    expect(component.projectOptions()[0].title).toBe('Portfolio');
    expect(component.experienceOptions()[0].subtitle).toBe('Acme');
    expect(component.formationOptions()[0].subtitle).toBe('PUC Minas');
  });

  it('supports read, pickers, paging and empty selections', async () => {
    await settle();
    const component = fixture.componentInstance as unknown as TechnologiesTestApi;
    component.openReadModal();
    expect(component.modalMode()).toBe('read');
    component.openUpdatePickerModal();
    expect(component.modalMode()).toBe('pick-update');
    component.openDeletePickerModal();
    expect(component.modalMode()).toBe('pick-delete');
    component.openUpdateModal('missing');
    component.openDeleteModal('missing');
    expect(component.selectedTechnology()).toBeNull();
    component.paginationSignal.set({
      page: 1,
      pageSize: 5,
      totalItems: 2,
      totalPages: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    });
    await component.goToPage(2);
    component.recordsSignal.set([]);
    component.paginationSignal.set({
      page: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    });
    component.openReadModal();
    expect(component.modalMode()).toBe('pick-delete');
    await component.updateSearchQuery(' angular ');
    await component.updateSearchQuery('angular');
    component.closeModal();
    expect(component.modalMode()).toBeNull();
  });

  it('validates fields, session and selection', async () => {
    await settle();
    const component = fixture.componentInstance as unknown as TechnologiesTestApi;
    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.requiredSlug');
    component.updateField('slug', 'x');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.requiredName');
    component.updateField('name', 'X');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.requiredStack');
    component.updateField('stack', 'FRONT_END');
    component.updateField('type', 'FRAMEWORKS');
    component.updateField('sortOrder', 'bad');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.invalidSortOrder');
    component.updateField('sortOrder', '1');
    component.modeSignal.set('update');
    component.selectedSignal.set(null);
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.technologies.feedback.selectionRequired',
    );
    component.modeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.technologies.feedback.selectionRequired',
    );
    session.accessToken.and.returnValue(null);
    component.modeSignal.set('create');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.missingSession');
  });

  it('exposes save, delete and load failures', async () => {
    await settle();
    const component = fixture.componentInstance as unknown as TechnologiesTestApi;
    service.create.and.returnValue(throwError(() => new Error()));
    service.update.and.returnValue(throwError(() => new Error()));
    service.delete.and.returnValue(throwError(() => new Error()));
    component.openCreateModal();
    component.updateField('slug', 'x');
    component.updateField('name', 'X');
    component.updateField('stack', 'FRONT_END');
    component.updateField('type', 'FRAMEWORKS');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.saveError');
    component.openUpdateModal('technology-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.saveError');
    component.openDeleteModal('technology-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.technologies.feedback.deleteError');
    service.getAll.and.returnValue(throwError(() => new Error()));
    await component.loadWorkspace();
    expect(toast.showError).toHaveBeenCalledWith('pages.admin.technologies.feedback.loadError');
  });

  it('ignores submit when no workflow is active', async () => {
    await settle();
    await (fixture.componentInstance as unknown as TechnologiesTestApi).submitModal();
    expect(service.create).not.toHaveBeenCalled();
  });
});
