import { bindHansInputValue, readHansInputValue } from './input.helper';

describe('input.helper', () => {
  it('should return an empty string when no element is provided', () => {
    expect(readHansInputValue(null)).toBe('');
    expect(readHansInputValue(undefined)).toBe('');
  });

  it('should read the host value when available', () => {
    const element = document.createElement('div') as HTMLElement & { value?: string };
    element.value = 'angular';

    expect(readHansInputValue(element)).toBe('angular');
  });

  it('should read the value attribute when the host value is missing', () => {
    const element = document.createElement('div');
    element.setAttribute('value', 'typescript');

    expect(readHansInputValue(element)).toBe('typescript');
  });

  it('should read the shadow input value when the host has no direct value', () => {
    const element = document.createElement('div');
    const shadowRoot = element.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.value = 'docker';
    shadowRoot.appendChild(input);

    expect(readHansInputValue(element)).toBe('docker');
  });

  it('should bind host and shadow listeners using the latest rendered value', () => {
    const element = document.createElement('div') as HTMLElement & { value?: string };
    const shadowRoot = element.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    shadowRoot.appendChild(input);

    const values: string[] = [];
    const cleanup = bindHansInputValue(element, (value) => values.push(value));

    element.value = 'react';
    element.dispatchEvent(new Event('valuechange'));

    input.value = 'node';
    input.dispatchEvent(new Event('input'));

    cleanup();

    element.value = 'ignored';
    element.dispatchEvent(new Event('valuechange'));

    expect(values).toEqual(['react', 'node']);
  });

  it('should return a noop cleanup when there is no element to bind', () => {
    const nullCleanup = bindHansInputValue(null, () => undefined);
    const undefinedCleanup = bindHansInputValue(undefined, () => undefined);

    expect(nullCleanup).toEqual(jasmine.any(Function));
    expect(undefinedCleanup).toEqual(jasmine.any(Function));

    expect(() => nullCleanup()).not.toThrow();
    expect(() => undefinedCleanup()).not.toThrow();
  });

  it('should fallback to the host value when the shadow control is unavailable during dispatch', () => {
    const element = document.createElement('div') as HTMLElement & { value?: string };
    element.value = 'fallback';
    const values: string[] = [];
    const cleanup = bindHansInputValue(element, (value) => values.push(value));

    element.dispatchEvent(new Event('keyup'));
    cleanup();

    expect(values).toEqual(['fallback']);
  });

  it('should fallback to the latest readable host value when the original shadow input dispatches after removal', () => {
    const element = document.createElement('div') as HTMLElement & { value?: string };
    const shadowRoot = element.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    shadowRoot.appendChild(input);

    const values: string[] = [];
    const cleanup = bindHansInputValue(element, (value) => values.push(value));

    element.value = 'shadow-fallback';
    shadowRoot.removeChild(input);
    input.dispatchEvent(new Event('input'));
    cleanup();

    expect(values).toEqual(['shadow-fallback']);
  });
});
