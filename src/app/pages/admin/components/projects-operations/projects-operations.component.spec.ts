import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProjectsOperationsService } from '../../../../core/api/admin/projects/projects-operations.service';
import {
  ProjectRecord,
  ProjectsCollectionResponse,
} from '../../../../core/api/admin/projects/projects-operations.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologiesCollectionResponse } from '../../../../core/api/technologies/technologies.types';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { TagsOperationsService } from '../../../../core/api/admin/tags/tags-operations.service';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ProjectsOperationsComponent } from './projects-operations.component';

const response = (
  data: object[] = [
    {
      id: 'p-1',
      slug: 'p',
      titlePt: 'PT',
      titleEn: 'EN',
      shortDescriptionPt: 'S',
      shortDescriptionEn: 'S',
      fullDescriptionPt: 'D',
      fullDescriptionEn: 'D',
      context: 'PROFESSIONAL',
      status: 'COMPLETED',
      environment: 'FRONTEND',
      featured: false,
      highlight: true,
      startDate: null,
      endDate: null,
      sortOrder: 1,
      technologyRelations: [],
      experienceIds: [],
      tagIds: [],
      linkIds: [],
      imageAssetIds: [],
    },
  ],
) => ({
  data,
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: data.length,
    totalPages: data.length ? 1 : 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});

const catalog = (
  data: object[] = [
    {
      id: 'x-1',
      slug: 'x',
      name: 'X',
      titlePt: 'X',
      namePt: 'X',
      labelPt: 'X',
      url: 'https://x.test',
      fileName: 'vh_logo_blue.svg',
      filePath: '/assets/img/logo/vh_logo_blue.svg',
    },
  ],
) => ({
  data,
  pagination: {
    page: 1,
    pageSize: 100,
    totalItems: data.length,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});

interface ComponentApi {
  hasProjects(): boolean;
  openCreateModal(): void;
  openReadModal(): void;
  openUpdatePickerModal(): void;
  openDeletePickerModal(): void;
  openUpdateModal(id: string): void;
  openDeleteModal(id: string): void;
  closeModal(): void;
  updateField(field: string, value: string): void;
  updateBoolean(field: string, value: boolean): void;
  toggle(field: string, id: string): void;
  updateSearchQuery(value: string): Promise<void>;
  goToPage(page: number): Promise<void>;
  submitModal(): Promise<void>;
  modalFeedbackKey(): string | null;
  loadErrorKey(): string | null;
  modalTitleKey(): string;
}

const fillRequiredProjectFields = (component: ComponentApi): void => {
  component.updateField('slug', 'project-slug');
  component.updateField('titlePt', 'Projeto');
  component.updateField('titleEn', 'Project');
  component.updateField('shortDescriptionPt', 'Resumo');
  component.updateField('shortDescriptionEn', 'Summary');
  component.updateField('fullDescriptionPt', 'Descricao');
  component.updateField('fullDescriptionEn', 'Description');
  component.updateField('context', 'PROFESSIONAL');
  component.updateField('status', 'COMPLETED');
  component.updateField('environment', 'FRONTEND');
};

describe('ProjectsOperationsComponent', () => {
  let fixture: ComponentFixture<ProjectsOperationsComponent>;
  let api: jasmine.SpyObj<ProjectsOperationsService>;
  let techService: jasmine.SpyObj<TechnologiesService>;
  let session: { accessToken: jasmine.Spy<() => string | null> };
  let toast: jasmine.SpyObj<ToastService>;

  beforeAll(() => {
    for (const name of [
      'hans-button',
      'hans-input',
      'hans-date-picker',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
      'hans-toggle',
    ])
      if (!customElements.get(name)) customElements.define(name, class extends HTMLElement {});
  });

  beforeEach(async () => {
    spyOn(console, 'error').and.stub();
    api = jasmine.createSpyObj('ProjectsOperationsService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    techService = jasmine.createSpyObj('TechnologiesService', ['getTechnologies']);
    const tech = techService;
    const exp = jasmine.createSpyObj('ExperiencesService', ['getExperiences']);
    const tags = jasmine.createSpyObj('TagsOperationsService', ['getAll']);
    const links = jasmine.createSpyObj('LinksOperationsService', ['getAll']);
    const images = jasmine.createSpyObj('ImageAssetsOperationsService', ['getAll']);
    session = { accessToken: jasmine.createSpy('accessToken').and.returnValue('token') };
    toast = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
    api.getAll.and.returnValue(of(response() as unknown as ProjectsCollectionResponse));
    api.create.and.returnValue(of({} as unknown as ProjectRecord));
    api.update.and.returnValue(of({} as unknown as ProjectRecord));
    api.delete.and.returnValue(of(void 0));
    tech.getTechnologies.and.returnValue(
      of(catalog() as unknown as TechnologiesCollectionResponse),
    );
    exp.getExperiences.and.returnValue(of(catalog() as never));
    tags.getAll.and.returnValue(of(catalog() as never));
    links.getAll.and.returnValue(of(catalog() as never));
    images.getAll.and.returnValue(of(catalog() as never));
    await TestBed.configureTestingModule({
      imports: [ProjectsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: ProjectsOperationsService, useValue: api },
        { provide: TechnologiesService, useValue: tech },
        { provide: ExperiencesService, useValue: exp },
        { provide: TagsOperationsService, useValue: tags },
        { provide: LinksOperationsService, useValue: links },
        { provide: ImageAssetsOperationsService, useValue: images },
        { provide: AdminSessionService, useValue: session },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsOperationsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('loads and exposes project workflows', async () => {
    const c = fixture.componentInstance as unknown as ComponentApi;
    expect(c.hasProjects()).toBeTrue();
    c.openReadModal();
    expect(c['modalTitleKey']()).toBe('pages.admin.projects.modal.read.title');
    c.openUpdatePickerModal();
    expect(c['modalTitleKey']()).toBe('pages.admin.projects.modal.pickUpdate.title');
    c.openDeletePickerModal();
    expect(c['modalTitleKey']()).toBe('pages.admin.projects.modal.pickDelete.title');
    c.openCreateModal();
    expect(c['modalTitleKey']()).toBe('pages.admin.projects.modal.create.title');
    c.updateField('slug', 'new');
    c.updateField('technologyIds', 'ignored');
    c.updateBoolean('highlight', false);
    c.toggle('technologyIds', 'x-1');
    c.toggle('technologyIds', 'x-1');
    await c.updateSearchQuery(' q ');
    await c.updateSearchQuery(' q ');
    await c.goToPage(0);
    await c.goToPage(2);
    await c.goToPage(1);
    c.closeModal();
  });

  it('submits create, update and delete', async () => {
    const c = fixture.componentInstance as unknown as ComponentApi;
    c.openCreateModal();
    fillRequiredProjectFields(c);
    await c.submitModal();
    c.openUpdateModal('p-1');
    await c.submitModal();
    c.openDeleteModal('p-1');
    await c.submitModal();
    expect(api.create).toHaveBeenCalled();
    expect(api.update).toHaveBeenCalled();
    expect(api.delete).toHaveBeenCalled();
    session.accessToken.and.returnValue(null);
    c.openCreateModal();
    await c.submitModal();
    expect(c.modalFeedbackKey()).toBe('pages.admin.projects.feedback.missingSession');
  });

  it('surfaces validation and errors', async () => {
    const c = fixture.componentInstance as unknown as ComponentApi;
    c.openCreateModal();
    fillRequiredProjectFields(c);
    c.updateField('context', '');
    await c.submitModal();
    expect(c.modalFeedbackKey()).toBe('pages.admin.projects.feedback.requiredOptions');
    session.accessToken.and.returnValue('token');
    api.create.and.returnValue(throwError(() => new Error()));
    c.updateField('context', 'PROFESSIONAL');
    await c.submitModal();
    expect(c.modalFeedbackKey()).toBe('pages.admin.projects.feedback.saveError');
    c.openDeleteModal('p-1');
    api.delete.and.returnValue(throwError(() => new Error()));
    await c.submitModal();
    expect(c.modalFeedbackKey()).toBe('pages.admin.projects.feedback.deleteError');
    api.getAll.and.returnValue(throwError(() => new Error()));
    await c.updateSearchQuery('failed');
    expect(c.loadErrorKey()).toBe('pages.admin.projects.feedback.loadError');
    expect(toast.showError).toHaveBeenCalled();
    techService.getTechnologies.and.returnValue(throwError(() => new Error()));
    c.openCreateModal();
    await Promise.resolve();
    const internal = c as unknown as {
      modeSignal: { set(value: string | null): void };
      selected: { set(value: ProjectRecord | null): void };
    };
    internal.modeSignal.set('delete');
    internal.selected.set(null);
    await c.submitModal();
    internal.modeSignal.set(null);
    await c.submitModal();
  });

  it('covers valid pagination, empty update selections and catalog fallbacks', async () => {
    const c = fixture.componentInstance as unknown as ComponentApi;
    const internal = c as unknown as {
      pageSignal: { set(value: object): void };
      modeSignal: { set(value: string | null): void };
      selected: { set(value: ProjectRecord | null): void };
      tags: { getAll: jasmine.Spy };
      links: { getAll: jasmine.Spy };
    };
    internal.pageSignal.set({
      page: 1,
      pageSize: 5,
      totalItems: 10,
      totalPages: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    });
    await c.goToPage(2);
    c.openCreateModal();
    fillRequiredProjectFields(c);
    internal.modeSignal.set('update');
    internal.selected.set(null);
    await c.submitModal();
    internal.tags.getAll.and.returnValue(
      of(catalog([{ id: 'tag-1', namePt: null, labelPt: 'Label', slug: 'tag' }]) as never),
    );
    internal.links.getAll.and.returnValue(
      of(
        catalog([
          { id: 'link-1', labelPt: null, labelEn: 'English', url: 'https://link.test' },
        ]) as never,
      ),
    );
    c.openCreateModal();
    await fixture.whenStable();
    expect(c.hasProjects()).toBeTrue();
    internal.tags.getAll.and.returnValue(
      of(catalog([{ id: 'tag-1', namePt: null, labelPt: null, slug: 'tag' }]) as never),
    );
    internal.links.getAll.and.returnValue(
      of(
        catalog([
          { id: 'link-1', labelPt: null, labelEn: null, url: 'https://link.test' },
        ]) as never,
      ),
    );
    c.openCreateModal();
    await fixture.whenStable();
  });
});
