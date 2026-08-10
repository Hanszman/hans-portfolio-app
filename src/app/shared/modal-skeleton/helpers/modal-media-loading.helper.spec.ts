import { ModalMediaLoadingTracker } from './modal-media-loading.helper';

describe('ModalMediaLoadingTracker', () => {
  it('should track unique media sources until every source settles', () => {
    const tracker = new ModalMediaLoadingTracker();
    const sources = ['/one.png', '/one.png', '/two.png', ''];
    expect(tracker.isLoading(sources, true)).toBeTrue();

    tracker.settle('/unknown.png');
    tracker.settle('/one.png');
    tracker.settle('/one.png');
    expect(tracker.isLoading(sources, true)).toBeTrue();

    tracker.settle('/two.png');
    expect(tracker.isLoading(sources, true)).toBeFalse();
  });

  it('should stay ready without media or while closed', () => {
    const tracker = new ModalMediaLoadingTracker();
    tracker.settle('');
    expect(tracker.isLoading([], true)).toBeFalse();
    expect(tracker.isLoading(['/one.png'], false)).toBeFalse();
  });
});
