interface HansInputEventDetail {
  target?: HansInputEventTarget;
  value?: string;
}

interface HansInputEventTarget extends EventTarget {
  value?: string;
}

export const getHansInputEventValue = (event: Event): string => {
  const detail = (event as CustomEvent<HansInputEventDetail>).detail;

  if (typeof detail?.value === 'string') {
    return detail.value;
  }

  if (typeof detail?.target?.value === 'string') {
    return detail.target.value;
  }

  const target = event.target as HansInputEventTarget | null;

  if (typeof target?.value === 'string') {
    return target.value;
  }

  const currentTarget = event.currentTarget as HansInputEventTarget | null;

  return currentTarget?.value ?? '';
};
