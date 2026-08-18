import { TagModalImage } from '../tag/tag-modal/tag-modal.types';

export type TechnologyLevelKey = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'STUDYING';

export type TechnologyFrequencyKey = 'RARE' | 'OCCASIONAL' | 'FREQUENT';

export type TechnologyProgressColor = 'danger' | 'warning' | 'success';

export interface TechnologyProgressViewModel {
  label: string;
  valueLabel: string;
  value: number;
  color: TechnologyProgressColor;
}

export interface TechnologyContextMetricViewModel {
  key: 'PROFESSIONAL' | 'PERSONAL' | 'ACADEMIC' | 'STUDY';
  label: string;
  totalMonths: number;
}

export interface TechnologyContextPeriodViewModel {
  id: string;
  key: TechnologyContextMetricViewModel['key'];
  label: string;
  startedAt: string;
  endedAt: string | null;
}

export interface TechnologyModalItem {
  slug: string;
  name: string;
  type?: string;
  stack?: string;
  level?: string;
  levelKey?: TechnologyLevelKey;
  frequency?: string;
  frequencyKey?: TechnologyFrequencyKey;
  projectCount?: number;
  experience?: string;
  image?: TagModalImage | null;
  contextMetrics?: readonly TechnologyContextMetricViewModel[];
  contextPeriods?: readonly TechnologyContextPeriodViewModel[];
}
