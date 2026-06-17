import { getHansInputEventValue } from './hans-input-event.helper';

describe('getHansInputEventValue', () => {
  it('returns the custom event detail value', () => {
    const event = new CustomEvent('change', { detail: { value: 'angular' } });

    expect(getHansInputEventValue(event)).toBe('angular');
  });

  it('returns the custom event detail target value', () => {
    const event = new CustomEvent('change', {
      detail: { target: { value: 'typescript' } },
    });

    expect(getHansInputEventValue(event)).toBe('typescript');
  });

  it('returns the native target value', () => {
    const input = document.createElement('input');
    input.value = 'projects';

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });

    expect(getHansInputEventValue(event)).toBe('projects');
  });

  it('returns the current target value when no target value exists', () => {
    const input = document.createElement('input');
    input.value = 'skills';
    const event = new Event('change');
    Object.defineProperty(event, 'currentTarget', { value: input });

    expect(getHansInputEventValue(event)).toBe('skills');
  });

  it('returns an empty string when the event has no value', () => {
    expect(getHansInputEventValue(new Event('change'))).toBe('');
  });
});
