import { TechnologyContextKey } from '../../../../core/api/technologies/technologies.types';
import { TechnologyContextRecord } from '../../../../core/api/technology-contexts/technology-contexts.types';
import { AdminFormFieldConfig } from '../../admin.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import {
  normalizeAdminDateValueForMutation,
  normalizeAdminDateValueForPicker,
  validateAdminDateRange,
} from '../../helpers/admin.helper';
import { AdminSelectOptionViewModel } from '../../helpers/admin.helper';

export type TechnologyContextsOperationsModalMode =
  | 'create'
  | 'read'
  | 'pick-update'
  | 'pick-delete'
  | 'update'
  | 'delete';

export const TECHNOLOGY_CONTEXT_VALUES: readonly TechnologyContextKey[] = [
  'PROFESSIONAL',
  'PERSONAL',
  'ACADEMIC',
  'STUDY',
];

export const TECHNOLOGY_CONTEXT_LABEL_KEYS = {
  PROFESSIONAL: 'taxonomy.skills.context.professional',
  PERSONAL: 'taxonomy.skills.context.personal',
  ACADEMIC: 'taxonomy.skills.context.academic',
  STUDY: 'taxonomy.skills.context.study',
} as const satisfies Record<TechnologyContextKey, AppTranslationKey>;

export interface TechnologyContextFormValue {
  technologyId: string;
  context: string;
  startedAt: string;
  endedAt: string;
}

export type TechnologyContextTechnologyOption = AdminSelectOptionViewModel<string>;

export interface TechnologyContextViewModel extends TechnologyContextFormValue {
  id: string;
  technologyName: string;
  technologySlug: string;
  contextLabel: string;
  dateRangeLabel: string;
}

export type TechnologyContextMutationBuildResult =
  | {
      isValid: true;
      payload: {
        technologyId: string;
        context: TechnologyContextKey;
        startedAt: string;
        endedAt?: string | null;
      };
    }
  | { isValid: false; errorKey: AppTranslationKey };

export const TECHNOLOGY_CONTEXT_FIELDS = {
  technologyId: {
    labelKey: 'common.fields.technology',
    required: true,
  },
  context: { labelKey: 'pages.admin.projects.fields.context.label', required: true },
  startedAt: { labelKey: 'pages.admin.formations.fields.startDate.label', required: true },
  endedAt: {
    labelKey: 'pages.admin.technologyContexts.fields.endedAt.label',
    required: false,
  },
} as const satisfies Record<string, AdminFormFieldConfig>;

export const createEmptyTechnologyContextFormValue = (): TechnologyContextFormValue => ({
  technologyId: '',
  context: '',
  startedAt: '',
  endedAt: '',
});

export const buildTechnologyContextFormValue = (
  record: TechnologyContextRecord | null | undefined,
): TechnologyContextFormValue =>
  record
    ? {
        technologyId: record.technologyId ?? record.technology?.id ?? '',
        context: record.context ?? '',
        startedAt: normalizeAdminDateValueForPicker(record.startedAt),
        endedAt: normalizeAdminDateValueForPicker(record.endedAt),
      }
    : createEmptyTechnologyContextFormValue();

export const buildTechnologyContextMutationPayload = (
  form: TechnologyContextFormValue,
): TechnologyContextMutationBuildResult => {
  if (!form.technologyId.trim())
    return {
      isValid: false,
      errorKey: 'pages.admin.technologyContexts.feedback.requiredTechnology',
    };
  if (!TECHNOLOGY_CONTEXT_VALUES.includes(form.context as TechnologyContextKey))
    return { isValid: false, errorKey: 'pages.admin.technologyContexts.feedback.requiredContext' };
  if (!form.startedAt.trim())
    return {
      isValid: false,
      errorKey: 'pages.admin.technologyContexts.feedback.requiredStartDate',
    };
  const startedAt = normalizeAdminDateValueForMutation(form.startedAt);
  const endedAt = normalizeAdminDateValueForMutation(form.endedAt);
  const dateRange = validateAdminDateRange(
    startedAt,
    endedAt,
    'common.feedback.invalidDateRange',
  );
  if (!dateRange.isValid) return dateRange;
  return {
    isValid: true,
    payload: {
      technologyId: form.technologyId,
      context: form.context as TechnologyContextKey,
      startedAt,
      ...(endedAt ? { endedAt } : { endedAt: null }),
    },
  };
};
