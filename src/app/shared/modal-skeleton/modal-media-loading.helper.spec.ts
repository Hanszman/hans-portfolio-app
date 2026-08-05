import { ModalMediaLoadingTracker } from './modal-media-loading.helper';

describe('ModalMediaLoadingTracker', () => {
  it('should track unique media sources until every source settles', () => {
    const tracker = new ModalMediaLoadingTracker();
    tracker.reset(['/one.png', '/one.png', '/two.png', ''], true);
    expect(tracker.isLoading()).toBeTrue();

    tracker.settle('/unknown.png');
    tracker.settle('/one.png');
    expect(tracker.isLoading()).toBeTrue();

    tracker.settle('/two.png');
    expect(tracker.isLoading()).toBeFalse();
  });

  it('should stay ready without media or while closed', () => {
    const tracker = new ModalMediaLoadingTracker();
    tracker.reset([], true);
    expect(tracker.isLoading()).toBeFalse();

    tracker.reset(['/one.png'], false);
    expect(tracker.isLoading()).toBeFalse();
  });
});
