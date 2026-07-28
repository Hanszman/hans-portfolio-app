import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TechnologyContextsOperationsService } from '../../../../core/api/admin/technology-contexts/technology-contexts-operations.service';
import { TechnologyContextRecord } from '../../../../core/api/admin/technology-contexts/technology-contexts-operations.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { TechnologyContextsOperationsComponent } from './technology-contexts-operations.component';

const record = (overrides: Partial<TechnologyContextRecord> = {}): TechnologyContextRecord => ({
  id: 'context-1',
  technologyId: 'tech-1',
  context: 'PROFESSIONAL',
  startedAt: '2026-01-01',
  endedAt: null,
  technology: { id: 'tech-1', slug: 'angular', name: 'Angular' },
  ...overrides,
});
const technology: TechnologyCollectionItemResponse = {
  id: 'tech-1',
  slug: 'angular',
  name: 'Angular',
  category: 'OTHER',
  level: 'BASIC',
  frequency: 'FREQUENT',
  highlight: true,
};
const response = (data: TechnologyContextRecord[] = [record()], page = 1) => ({
  data,
  pagination: {
    page,
    pageSize: 5,
    totalItems: data.length,
    totalPages: data.length ? 2 : 0,
    hasPreviousPage: page > 1,
    hasNextPage: data.length > 0 && page < 2,
  },
});

describe('TechnologyContextsOperationsComponent', () => {
  let fixture: ComponentFixture<TechnologyContextsOperationsComponent>;
  let service: jasmine.SpyObj<TechnologyContextsOperationsService>;
  let technologies: jasmine.SpyObj<TechnologiesService>;
  let toast: jasmine.SpyObj<ToastService>;
  let accessToken: jasmine.Spy<() => string | null>;

  beforeAll(() => {
    for (const name of [
      'hans-button',
      'hans-input',
      'hans-date-picker',
      'hans-modal',
      'hans-select-option',
      'hans-loading',
    ])
      if (!customElements.get(name)) customElements.define(name, class extends HTMLElement {});
  });

  beforeEach(async () => {
    service = jasmine.createSpyObj('TechnologyContextsOperationsService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    technologies = jasmine.createSpyObj('TechnologiesService', ['getTechnologies']);
    toast = jasmine.createSpyObj('ToastService', ['showError', 'showSuccess']);
    accessToken = jasmine.createSpy('accessToken').and.returnValue('token');
    service.getAll.and.returnValue(of(response()));
    service.create.and.returnValue(of(record()));
    service.update.and.returnValue(of(record()));
    service.delete.and.returnValue(of(void 0));
    technologies.getTechnologies.and.returnValue(
      of({
        data: [technology],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 1,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    );
    await TestBed.configureTestingModule({
      imports: [TechnologyContextsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TechnologyContextsOperationsService, useValue: service },
        { provide: TechnologiesService, useValue: technologies },
        { provide: ToastService, useValue: toast },
        { provide: AdminSessionService, useValue: { accessToken } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TechnologyContextsOperationsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('loads the public context collection and opens each picker', () => {
    const component = fixture.componentInstance;
    expect(service.getAll).toHaveBeenCalled();
    expect(technologies.getTechnologies).toHaveBeenCalled();
    const access = component as unknown as {
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openCreateModal(): void;
      closeModal(): void;
    };
    access.openReadModal();
    expect((component as unknown as { modalMode(): string | null }).modalMode()).toBe('read');
    expect((component as unknown as { modalTitleKey(): string }).modalTitleKey()).toContain('read.title');
    access.openUpdatePickerModal();
    expect((component as unknown as { modalMode(): string | null }).modalMode()).toBe(
      'pick-update',
    );
    expect((component as unknown as { modalTitleKey(): string }).modalTitleKey()).toContain('pickUpdate.title');
    access.openDeletePickerModal();
    expect((component as unknown as { modalMode(): string | null }).modalMode()).toBe(
      'pick-delete',
    );
    expect((component as unknown as { modalTitleKey(): string }).modalTitleKey()).toContain('pickDelete.title');
    access.openCreateModal();
    expect((component as unknown as { modalMode(): string | null }).modalMode()).toBe('create');
    expect((component as unknown as { modalTitleKey(): string }).modalTitleKey()).toContain('create.title');
    access.closeModal();
    expect((component as unknown as { modalMode(): string | null }).modalMode()).toBeNull();
  });

  it('handles search and valid create, update and delete workflows', async () => {
    const component = fixture.componentInstance as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    component['openCreateModal']();
    component['updateField']('technologyId', 'tech-1');
    component['updateField']('context', 'PROFESSIONAL');
    component['updateField']('startedAt', '2026-01-01');
    component['submitModal']();
    await fixture.whenStable();
    component['openUpdateModal']('context-1');
    component['submitModal']();
    await fixture.whenStable();
    component['openDeleteModal']('context-1');
    component['submitModal']();
    await fixture.whenStable();
    await component['updateSearchQuery'](' angular ');
    await component['goToPage'](2);
    expect(service.create).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalled();
    expect(service.getAll).toHaveBeenCalledWith(1, 5, 'angular');
    expect(service.getAll).toHaveBeenCalledWith(2, 5, 'angular');
    expect(toast.showSuccess).toHaveBeenCalled();
  });

  it('reports missing session and invalid form fields', async () => {
    accessToken.and.returnValue(null);
    const component = fixture.componentInstance as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    component['openCreateModal']();
    await component['submitModal']();
    expect(toast.showError).toHaveBeenCalled();
    accessToken.and.returnValue('token');
    component['updateField']('technologyId', '');
    await component['submitModal']();
    component['updateField']('technologyId', 'tech-1');
    await component['submitModal']();
    component['updateField']('context', 'INVALID');
    await component['submitModal']();
    component['updateField']('context', 'PROFESSIONAL');
    await component['submitModal']();
    expect(service.create).not.toHaveBeenCalled();
  });

  it('handles loading and mutation failures', async () => {
    service.getAll.and.returnValue(throwError(() => new Error('load')));
    technologies.getTechnologies.and.returnValue(throwError(() => new Error('load')));
    const component = TestBed.createComponent(TechnologyContextsOperationsComponent);
    component.detectChanges();
    await component.whenStable();
    await Promise.resolve();
    expect(toast.showError).toHaveBeenCalled();
    service.getAll.and.returnValue(of(response()));
    technologies.getTechnologies.and.returnValue(
      of({
        data: [technology],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 1,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    );
    service.create.and.returnValue(throwError(() => new Error('save')));
    const second = TestBed.createComponent(TechnologyContextsOperationsComponent);
    second.detectChanges();
    await second.whenStable();
    const access = second.componentInstance as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    access['openCreateModal']();
    access['updateField']('technologyId', 'tech-1');
    access['updateField']('context', 'PROFESSIONAL');
    access['updateField']('startedAt', '2026-01-01');
    await access['submitModal']();
    expect(toast.showError).toHaveBeenCalled();
    service.delete.and.returnValue(throwError(() => new Error('delete')));
    access['openDeleteModal']('context-1');
    await access['submitModal']();
    expect(toast.showError).toHaveBeenCalled();
  });

  it('returns from an empty delete and adjusts the page after deleting its last record', async () => {
    const component = fixture.componentInstance as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    await component['submitDelete']();
    service.getAll.and.callFake((page: number) => of(response([record()], page)));
    await component['goToPage'](2);
    component['openDeleteModal']('context-1');
    await component['submitDelete']();
    expect(service.delete).toHaveBeenCalledWith('context-1');
    expect(service.getAll).toHaveBeenCalledWith(1, 5, '');
  });

  it('refreshes technology options whenever an operation picker opens', async () => {
    const component = fixture.componentInstance as unknown as Record<string, (...args: unknown[]) => unknown>;
    const refreshedTechnology = { ...technology, id: 'tech-2', name: 'New technology', slug: 'new-technology' };
    technologies.getTechnologies.and.returnValue(of({
      data: [refreshedTechnology],
      pagination: { page: 1, pageSize: 100, totalItems: 1, totalPages: 1, hasPreviousPage: false, hasNextPage: false },
    }));
    component['openCreateModal']();
    await fixture.whenStable();
    expect((component['technologyOptions'] as () => readonly { label: string }[])().map((option) => option.label)).toContain('New technology (new-technology)');

    technologies.getTechnologies.and.returnValue(throwError(() => new Error('refresh')));
    component['openUpdatePickerModal']();
    component['openDeletePickerModal']();
    await fixture.whenStable();
    expect(toast.showError).not.toHaveBeenCalledWith('pages.admin.technologyContexts.feedback.loadError');
  });

  it('keeps collection actions closed when the public collection is empty', async () => {
    service.getAll.and.returnValue(of(response([], 1)));
    const emptyFixture = TestBed.createComponent(TechnologyContextsOperationsComponent);
    emptyFixture.detectChanges();
    await emptyFixture.whenStable();
    const component = emptyFixture.componentInstance as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;

    component['openReadModal']();
    component['openUpdatePickerModal']();
    component['openDeletePickerModal']();
    component['openUpdateModal']('missing');
    component['openDeleteModal']('missing');
    await component['goToPage'](0);
    await component['goToPage'](2);

    expect(
      (emptyFixture.componentInstance as unknown as { modalMode(): string | null }).modalMode(),
    ).toBeNull();
  });
});
