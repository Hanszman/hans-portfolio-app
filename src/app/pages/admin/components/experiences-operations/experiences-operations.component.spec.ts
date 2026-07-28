import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ExperiencesOperationsService } from '../../../../core/api/admin/experiences/experiences-operations.service';
import {
  ExperienceRecord,
  ExperiencesCollectionResponse,
} from '../../../../core/api/admin/experiences/experiences-operations.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologiesCollectionResponse } from '../../../../core/api/technologies/technologies.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { CustomersOperationsService } from '../../../../core/api/admin/customers/customers-operations.service';
import { JobsOperationsService } from '../../../../core/api/admin/jobs/jobs-operations.service';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { ExperiencesOperationsComponent } from './experiences-operations.component';

const response = (
  data: object[] = [
    {
      id: 'e-1',
      slug: 'e',
      companyName: 'Company',
      titlePt: 'PT',
      titleEn: 'EN',
      summaryPt: 'S',
      summaryEn: 'S',
      descriptionPt: 'D',
      descriptionEn: 'D',
      startDate: '2026-01-01',
      endDate: null,
      isCurrent: false,
      highlight: true,
      sortOrder: 1,
      technologyRelations: [],
      projectIds: [],
      customerIds: [],
      jobIds: [],
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
      fileName: 'x.png',
      filePath: '/x.png',
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
  hasExperiences(): boolean;
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
}

const fillRequiredExperienceFields = (component: ComponentApi): void => {
  component.updateField('slug', 'experience-slug');
  component.updateField('companyName', 'Company');
  component.updateField('titlePt', 'Titulo');
  component.updateField('titleEn', 'Title');
  component.updateField('summaryPt', 'Resumo');
  component.updateField('summaryEn', 'Summary');
  component.updateField('descriptionPt', 'Descricao');
  component.updateField('descriptionEn', 'Description');
  component.updateField('startDate', '2026-01-01');
};

describe('ExperiencesOperationsComponent', () => {
  let fixture: ComponentFixture<ExperiencesOperationsComponent>;
  let api: jasmine.SpyObj<ExperiencesOperationsService>;
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
    api = jasmine.createSpyObj('ExperiencesOperationsService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    techService = jasmine.createSpyObj('TechnologiesService', ['getTechnologies']);
    const tech = techService;
    const projects = jasmine.createSpyObj('ProjectsService', ['getProjects']);
    const customers = jasmine.createSpyObj('CustomersOperationsService', ['getAll']);
    const jobs = jasmine.createSpyObj('JobsOperationsService', ['getAll']);
    const links = jasmine.createSpyObj('LinksOperationsService', ['getAll']);
    const images = jasmine.createSpyObj('ImageAssetsOperationsService', ['getAll']);
    session = { accessToken: jasmine.createSpy('accessToken').and.returnValue('token') };
    toast = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
    api.getAll.and.returnValue(of(response() as unknown as ExperiencesCollectionResponse));
    api.create.and.returnValue(of({} as unknown as ExperienceRecord));
    api.update.and.returnValue(of({} as unknown as ExperienceRecord));
    api.delete.and.returnValue(of(void 0));
    tech.getTechnologies.and.returnValue(
      of(catalog() as unknown as TechnologiesCollectionResponse),
    );
    projects.getProjects.and.returnValue(of(catalog() as never));
    customers.getAll.and.returnValue(of(catalog() as never));
    jobs.getAll.and.returnValue(of(catalog() as never));
    links.getAll.and.returnValue(of(catalog() as never));
    images.getAll.and.returnValue(of(catalog() as never));
    await TestBed.configureTestingModule({
      imports: [ExperiencesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: ExperiencesOperationsService, useValue: api },
        { provide: TechnologiesService, useValue: tech },
        { provide: ProjectsService, useValue: projects },
        { provide: CustomersOperationsService, useValue: customers },
        { provide: JobsOperationsService, useValue: jobs },
        { provide: LinksOperationsService, useValue: links },
        { provide: ImageAssetsOperationsService, useValue: images },
        { provide: AdminSessionService, useValue: session },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperiencesOperationsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('loads and exposes the main workflows', async () => {
    const component = fixture.componentInstance as unknown as ComponentApi;
    expect(component['hasExperiences']()).toBeTrue();
    component['openReadModal']();
    component['openUpdatePickerModal']();
    component['openDeletePickerModal']();
    component['openCreateModal']();
    component['updateField']('slug', 'new-slug');
    component['updateField']('technologyIds', 'ignored');
    component['updateBoolean']('highlight', false);
    component['toggle']('technologyIds', 'x-1');
    component['toggle']('technologyIds', 'x-1');
    await component['updateSearchQuery'](' query ');
    await component['updateSearchQuery'](' query ');
    await component['goToPage'](0);
    await component['goToPage'](2);
    await component['goToPage'](1);
    const internal = component as unknown as { paginationSignal: { set(value: object): void } };
    internal.paginationSignal.set({
      page: 1,
      pageSize: 5,
      totalItems: 10,
      totalPages: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    });
    await component['goToPage'](2);
    component['closeModal']();
    expect(api.getAll).toHaveBeenCalled();
  });

  it('submits create, update and delete workflows', async () => {
    const component = fixture.componentInstance as unknown as ComponentApi;
    component['openCreateModal']();
    fillRequiredExperienceFields(component);
    await component['submitModal']();
    expect(api.create).toHaveBeenCalled();
    component['openUpdateModal']('e-1');
    await component['submitModal']();
    expect(api.update).toHaveBeenCalled();
    component['openDeleteModal']('e-1');
    await component['submitModal']();
    expect(api.delete).toHaveBeenCalled();
    component['openUpdateModal']('missing');
    component['openDeleteModal']('missing');
    const internal = component as unknown as {
      modeSignal: { set(value: string | null): void };
      selected: { set(value: ExperienceRecord | null): void };
    };
    internal.modeSignal.set('update');
    internal.selected.set(null);
    await component['submitModal']();
    session.accessToken.and.returnValue(null);
    component['openCreateModal']();
    await component['submitModal']();
    expect(component['modalFeedbackKey']()).toBe('pages.admin.experiences.feedback.missingSession');
  });

  it('surfaces validation, load and mutation errors', async () => {
    const component = fixture.componentInstance as unknown as ComponentApi;
    component['openCreateModal']();
    fillRequiredExperienceFields(component);
    component['updateField']('startDate', '');
    await component['submitModal']();
    expect(component['modalFeedbackKey']()).toBe(
      'pages.admin.experiences.feedback.requiredStartDate',
    );
    session.accessToken.and.returnValue('token');
    api.create.and.returnValue(throwError(() => new Error()));
    component['updateField']('startDate', '2026-01-01');
    await component['submitModal']();
    expect(component['modalFeedbackKey']()).toBe('pages.admin.experiences.feedback.saveError');
    component['openDeleteModal']('e-1');
    api.delete.and.returnValue(throwError(() => new Error()));
    await component['submitModal']();
    expect(component['modalFeedbackKey']()).toBe('pages.admin.experiences.feedback.deleteError');
    api.getAll.and.returnValue(throwError(() => new Error()));
    await component['updateSearchQuery']('failed');
    expect(component['loadErrorKey']()).toBe('pages.admin.experiences.feedback.loadError');
    expect(toast.showError).toHaveBeenCalled();
    const internal = component as unknown as {
      modeSignal: { set(value: string | null): void };
      selected: { set(value: ExperienceRecord | null): void };
      links: { getAll: jasmine.Spy };
    };
    internal.links.getAll.and.returnValue(
      of(
        catalog([
          { id: 'link-1', labelPt: null, labelEn: 'English label', url: 'https://link.test' },
        ]) as never,
      ),
    );
    component['openCreateModal']();
    await Promise.resolve();
    internal.links.getAll.and.returnValue(
      of(
        catalog([
          { id: 'link-1', labelPt: null, labelEn: null, url: 'https://link.test' },
        ]) as never,
      ),
    );
    component['openCreateModal']();
    await Promise.resolve();
    techService.getTechnologies.and.returnValue(throwError(() => new Error()));
    component['openCreateModal']();
    await Promise.resolve();
    internal.modeSignal.set('delete');
    internal.selected.set(null);
    await component['submitModal']();
    internal.modeSignal.set(null);
    await component['submitModal']();
  });
});
