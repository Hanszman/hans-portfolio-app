import { TechnologyContextKey } from '../../../../core/api/technologies/technologies.types';
import { TechnologyContextRecord } from '../../../../core/api/admin/technology-contexts/technology-contexts-operations.types';
import { AdminFormFieldConfig } from '../../admin.types';
import { AppTranslationKey } from '../../../../core/translation/translation.types';

export type TechnologyContextsOperationsModalMode =
  | 'create' | 'read' | 'pick-update' | 'pick-delete' | 'update' | 'delete';

export const TECHNOLOGY_CONTEXT_VALUES: readonly TechnologyContextKey[] = [
  'PROFESSIONAL', 'PERSONAL', 'ACADEMIC', 'STUDY',
];

export interface TechnologyContextFormValue {
  technologyId: string;
  context: string;
  startedAt: string;
  endedAt: string;
}

export interface TechnologyContextTechnologyOption {
  id: string;
  title: string;
  subtitle: string;
}

export interface TechnologyContextViewModel extends TechnologyContextFormValue {
  id: string;
  technologyName: string;
  technologySlug: string;
  contextLabel: string;
}

export type TechnologyContextMutationBuildResult =
  | { isValid: true; payload: { technologyId: string; context: TechnologyContextKey; startedAt: string; endedAt?: string | null } }
  | { isValid: false; errorKey: AppTranslationKey };

export const TECHNOLOGY_CONTEXT_FIELDS = {
  technologyId: { labelKey: 'pages.admin.technologyContexts.fields.technology.label', required: true },
  context: { labelKey: 'pages.admin.technologyContexts.fields.context.label', required: true },
  startedAt: { labelKey: 'pages.admin.technologyContexts.fields.startedAt.label', required: true },
  endedAt: { labelKey: 'pages.admin.technologyContexts.fields.endedAt.label' },
} as const satisfies Record<string, AdminFormFieldConfig>;

export const createEmptyTechnologyContextFormValue = (): TechnologyContextFormValue => ({
  technologyId: '', context: '', startedAt: '', endedAt: '',
});

export const buildTechnologyContextFormValue = (
  record: TechnologyContextRecord | null | undefined,
): TechnologyContextFormValue => record ? {
  technologyId: record.technologyId,
  context: record.context,
  startedAt: record.startedAt,
  endedAt: record.endedAt ?? '',
} : createEmptyTechnologyContextFormValue();

export const buildTechnologyContextMutationPayload = (
  form: TechnologyContextFormValue,
): TechnologyContextMutationBuildResult => {
  if (!form.technologyId.trim()) return { isValid: false, errorKey: 'pages.admin.technologyContexts.feedback.requiredTechnology' };
  if (!TECHNOLOGY_CONTEXT_VALUES.includes(form.context as TechnologyContextKey)) return { isValid: false, errorKey: 'pages.admin.technologyContexts.feedback.requiredContext' };
  if (!form.startedAt.trim()) return { isValid: false, errorKey: 'pages.admin.technologyContexts.feedback.requiredStartDate' };
  return {
    isValid: true,
    payload: {
      technologyId: form.technologyId,
      context: form.context as TechnologyContextKey,
      startedAt: form.startedAt,
      ...(form.endedAt.trim() ? { endedAt: form.endedAt } : { endedAt: null }),
    },
  };
};
