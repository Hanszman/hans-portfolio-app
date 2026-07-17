import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../api.config';
import { CustomersOperationsService } from './customers-operations.service';
import {
  CustomerMutationPayload,
  CustomerRecord,
  CustomersCollectionResponse,
} from './customers-operations.types';

const createCustomer = (): CustomerRecord => ({
  id: 'customer-1',
  slug: 'enterprise-client',
  name: 'Enterprise Client',
  summaryPt: 'Cliente corporativo',
  summaryEn: 'Corporate client',
  highlight: true,
  sortOrder: 1,
  isPublished: true,
  experienceIds: ['experience-1'],
  imageAssetIds: ['image-asset-1'],
  createdAt: '2026-07-17T00:00:00.000Z',
  updatedAt: '2026-07-17T00:00:00.000Z',
});

const createCustomersCollectionResponse = (): CustomersCollectionResponse => ({
  data: [createCustomer()],
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});

const createCustomerPayload = (): CustomerMutationPayload => ({
  slug: 'enterprise-client',
  name: 'Enterprise Client',
  summaryPt: 'Cliente corporativo',
  summaryEn: 'Corporate client',
  highlight: true,
  sortOrder: 1,
  isPublished: true,
  experienceIds: ['experience-1'],
  imageAssetIds: ['image-asset-1'],
});

describe('CustomersOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomersOperationsService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should load the protected customers collection through the public read endpoint', () => {
    const service = TestBed.inject(CustomersOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll().subscribe((response) => {
      expect(response).toEqual(createCustomersCollectionResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/customers?page=1&pageSize=5&sortBy=sortOrder&sortDirection=asc'),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createCustomersCollectionResponse());
  });

  it('should allow custom paging and searching when loading the collection', () => {
    const service = TestBed.inject(CustomersOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getAll(2, 4, ' enterprise ').subscribe();

    const request = httpTestingController.expectOne(
      buildApiUrl(
        '/customers?page=2&pageSize=4&sortBy=sortOrder&sortDirection=asc&search=enterprise',
      ),
    );

    expect(request.request.method).toBe('GET');

    request.flush(createCustomersCollectionResponse());
  });

  it('should create a protected customer', () => {
    const service = TestBed.inject(CustomersOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.create('token-123', createCustomerPayload()).subscribe((response) => {
      expect(response).toEqual(createCustomer());
    });

    const request = httpTestingController.expectOne(buildApiUrl('/admin/customers'));

    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createCustomerPayload());

    request.flush(createCustomer());
  });

  it('should update a protected customer through PUT', () => {
    const service = TestBed.inject(CustomersOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .update('token-123', 'customer-1', createCustomerPayload())
      .subscribe((response) => {
        expect(response).toEqual(createCustomer());
      });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/customers/customer-1'),
    );

    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');
    expect(request.request.body).toEqual(createCustomerPayload());

    request.flush(createCustomer());
  });

  it('should delete a protected customer', () => {
    const service = TestBed.inject(CustomersOperationsService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.delete('token-123', 'customer-1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/customers/customer-1'),
    );

    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush(null);
  });
});
