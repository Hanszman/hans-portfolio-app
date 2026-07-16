import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { ImageAssetsOperationsService } from './image-assets-operations.service';
import {
  ImageAssetMutationPayload,
  ImageAssetRecord,
  ImageAssetsCollectionResponse,
} from './image-assets-operations.types';

const createImageAsset = (): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'vh_logo_blue.svg',
  filePath: '/assets/img/logo/vh_logo_blue.svg',
  folder: 'logo',
  kind: 'ICON',
  altPt: 'Logo azul da Hans',
  altEn: 'Hans blue logo',
  captionPt: 'Versao azul da marca.',
  captionEn: 'Blue brand version.',
  mimeType: 'image/svg+xml',
  width: 240,
  height: 96,
  sortOrder: 1,
  isPublished: true,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: [],
  createdAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:00.000Z',
});

const createImageAssetsCollectionResponse = (): ImageAssetsCollectionResponse => ({
  data: [createImageAsset()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createImageAssetPayload = (): ImageAssetMutationPayload => ({
  fileName: 'vh_logo_blue.svg',
  filePath: '/assets/img/logo/vh_logo_blue.svg',
  folder: 'logo',
  kind: 'ICON',
  altPt: 'Logo azul da Hans',
  altEn: 'Hans blue logo',
  captionPt: 'Versao azul da marca.',
  captionEn: 'Blue brand version.',
  mimeType: 'image/svg+xml',
  width: 240,
  height: 96,
  sortOrder: 1,
  isPublished: true,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: [],
});

describe('ImageAssetsOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImageAssetsOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the protected image-assets collection through the public read endpoint', () => {
    const service = TestBed.inject(ImageAssetsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createImageAssetsCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/image-assets?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createImageAssetsCollectionResponse());
  });

  it('should allow custom paging when loading the collection', () => {
    const service = TestBed.inject(ImageAssetsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4).subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl('/image-assets?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createImageAssetsCollectionResponse());
  });

  it('should create a protected image asset', () => {
    const service = TestBed.inject(ImageAssetsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create('token-123', createImageAssetPayload()).subscribe((response) => {
      expect(response).toEqual(createImageAsset());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/image-assets'),
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createImageAssetPayload());

    request.flush(createImageAsset());
  });

  it('should update a protected image asset through PUT', () => {
    const service = TestBed.inject(ImageAssetsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .update('token-123', 'image-asset-1', createImageAssetPayload())
      .subscribe((response) => {
        expect(response).toEqual(createImageAsset());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/image-assets/image-asset-1'),
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createImageAssetPayload());

    request.flush(createImageAsset());
  });

  it('should delete a protected image asset', () => {
    const service = TestBed.inject(ImageAssetsOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('token-123', 'image-asset-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/image-assets/image-asset-1'),
    );

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush(null);
  });
});
