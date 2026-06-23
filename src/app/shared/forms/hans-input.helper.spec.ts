import { bindHansInputValueListener, syncHansInputDisplayedValue } from './hans-input.helper';
import { type HansInputHostElement } from './input.types';

describe('syncHansInputDisplayedValue', () => {
  it('should synchronize the host property and the inner input value', () => {
    const host = document.createElement('hans-input') as HansInputHostElement;
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.value = 'old';
    shadowRoot.appendChild(input);
    host.value = 'old';
    host.setAttribute('value', 'old');

    syncHansInputDisplayedValue(host, 'angular');

    expect(host.value).toBe('angular');
    expect(input.value).toBe('angular');
    expect(host.hasAttribute('value')).toBeFalse();
  });

  it('should ignore nullish hosts safely', () => {
    expect(() => syncHansInputDisplayedValue(null, 'angular')).not.toThrow();
    expect(() => syncHansInputDisplayedValue(undefined, 'angular')).not.toThrow();
  });

  it('should keep working when the shadow root has no input', () => {
    const host = document.createElement('hans-input') as HansInputHostElement;
    host.attachShadow({ mode: 'open' });

    syncHansInputDisplayedValue(host, 'portfolio');

    expect(host.value).toBe('portfolio');
  });
});

describe('bindHansInputValueListener', () => {
  it('should emit the latest host value after a host event', async () => {
    const host = document.createElement('hans-input') as HansInputHostElement;
    host.attachShadow({ mode: 'open' });
    host.value = 'angular';
    const listener = jasmine.createSpy('listener');
    const unbind = bindHansInputValueListener(host, listener);

    host.dispatchEvent(new Event('valuechange'));
    await Promise.resolve();

    expect(listener).toHaveBeenCalledOnceWith('angular');

    unbind();
  });

  it('should prioritize the event payload when the host value is still stale', async () => {
    const host = document.createElement('hans-input') as HansInputHostElement;
    host.attachShadow({ mode: 'open' });
    host.value = 'a';
    const listener = jasmine.createSpy('listener');
    const unbind = bindHansInputValueListener(host, listener);

    host.dispatchEvent(
      new CustomEvent<string>('valuechange', {
        detail: 'angular',
      }),
    );
    await Promise.resolve();

    expect(listener).toHaveBeenCalledOnceWith('angular');

    unbind();
  });

  it('should fall back to the inner input value when the host value is unavailable', async () => {
    const host = document.createElement('hans-input') as HansInputHostElement;
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.value = 'portfolio';
    shadowRoot.appendChild(input);
    host.value = undefined;
    const listener = jasmine.createSpy('listener');
    const unbind = bindHansInputValueListener(host, listener);

    host.dispatchEvent(new Event('input'));
    await Promise.resolve();

    expect(listener).toHaveBeenCalledOnceWith('portfolio');

    unbind();
  });

  it('should safely ignore nullish hosts', () => {
    const listener = jasmine.createSpy('listener');

    expect(() => bindHansInputValueListener(null, listener)).not.toThrow();
    expect(() => bindHansInputValueListener(undefined, listener)).not.toThrow();
  });
});
