import { TechnologyContextKey } from '../../core/api/technologies/technologies.types';
import {
  AppLocalizedText,
  AppLocale,
} from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';

export interface SkillFilterOption {
  label: string;
  value: string;
  action?: (option: SkillFilterOption) => void;
}

export interface SkillsDropdownElement extends HTMLElement {
  options?: readonly SkillFilterOption[];
}

export type SkillsSelectEvent = CustomEvent<SkillFilterOption>;

export interface SkillsSummaryMetricViewModel {
  label: string;
  value: string;
  supportingText?: string;
}

export interface SkillContextMetricViewModel {
  key: TechnologyContextKey;
  label: string;
  value: string;
  totalMonths: number;
}

export interface SkillCardViewModel {
  id: string;
  slug: string;
  name: string;
  categoryLabel: string;
  levelLabel: string;
  frequencyLabel: string;
  totalExperienceLabel: string;
  isHighlight: boolean;
  iconName: string;
  visualUrl: string;
  contexts: readonly SkillContextMetricViewModel[];
}

export interface SkillsGroupViewModel {
  id: string;
  title: string;
  description: string;
  tone: ContainerTone;
  iconName: string;
  items: readonly SkillCardViewModel[];
}

export const SKILL_FILTER_ALL_LABELS = {
  categories: {
    'en-us': 'All categories',
    'pt-BR': 'Todas as categorias',
    'es-es': 'Todas las categorias',
  },
  levels: {
    'en-us': 'All levels',
    'pt-BR': 'Todos os niveis',
    'es-es': 'Todos los niveles',
  },
  contexts: {
    'en-us': 'All contexts',
    'pt-BR': 'Todos os contextos',
    'es-es': 'Todos los contextos',
  },
} as const satisfies Record<string, AppLocalizedText>;

export const SKILL_FALLBACK_LABELS = {
  uncategorized: {
    'en-us': 'Uncategorized',
    'pt-BR': 'Nao categorizada',
    'es-es': 'Sin categoria',
  },
  levelNotSet: {
    'en-us': 'Level not set',
    'pt-BR': 'Nivel nao informado',
    'es-es': 'Nivel no informado',
  },
  frequencyNotSet: {
    'en-us': 'Frequency not set',
    'pt-BR': 'Frequencia nao informada',
    'es-es': 'Frecuencia no informada',
  },
  noDuration: {
    'en-us': 'No duration available',
    'pt-BR': 'Sem periodo consolidado',
    'es-es': 'Sin periodo consolidado',
  },
  zeroMonths: {
    'en-us': '0 months',
    'pt-BR': '0 meses',
    'es-es': '0 meses',
  },
  summaryMapped: {
    'en-us': 'Mapped technologies',
    'pt-BR': 'Tecnologias mapeadas',
    'es-es': 'Tecnologias mapeadas',
  },
  summaryHighlights: {
    'en-us': 'Highlights',
    'pt-BR': 'Destaques',
    'es-es': 'Destacados',
  },
  summaryCategories: {
    'en-us': 'Categories',
    'pt-BR': 'Categorias',
    'es-es': 'Categorias',
  },
  summaryAdvanced: {
    'en-us': 'Advanced stack',
    'pt-BR': 'Stack avancada',
    'es-es': 'Stack avanzada',
  },
  summaryLongest: {
    'en-us': 'Longest total time',
    'pt-BR': 'Maior tempo total',
    'es-es': 'Mayor tiempo total',
  },
  groupDescription: {
    'en-us': '{{count}} technologies with real duration coverage by context.',
    'pt-BR': '{{count}} tecnologias com tempo real consolidado por contexto.',
    'es-es': '{{count}} tecnologias con tiempo real consolidado por contexto.',
  },
} as const satisfies Record<string, AppLocalizedText>;

export const SKILL_CATEGORY_LABELS: Record<string, AppLocalizedText> = {
  FRAMEWORK: {
    'en-us': 'Framework',
    'pt-BR': 'Framework',
    'es-es': 'Framework',
  },
  LANGUAGE: {
    'en-us': 'Language',
    'pt-BR': 'Linguagem',
    'es-es': 'Lenguaje',
  },
  LIBRARY: {
    'en-us': 'Library',
    'pt-BR': 'Biblioteca',
    'es-es': 'Biblioteca',
  },
  DATABASE: {
    'en-us': 'Database',
    'pt-BR': 'Banco de dados',
    'es-es': 'Base de datos',
  },
  DEVOPS: {
    'en-us': 'DevOps',
    'pt-BR': 'DevOps',
    'es-es': 'DevOps',
  },
  ORM: {
    'en-us': 'ORM',
    'pt-BR': 'ORM',
    'es-es': 'ORM',
  },
};

export const SKILL_LEVEL_LABELS: Record<string, AppLocalizedText> = {
  ADVANCED: {
    'en-us': 'Advanced',
    'pt-BR': 'Avancado',
    'es-es': 'Avanzado',
  },
  INTERMEDIATE: {
    'en-us': 'Intermediate',
    'pt-BR': 'Intermediario',
    'es-es': 'Intermedio',
  },
  BEGINNER: {
    'en-us': 'Beginner',
    'pt-BR': 'Iniciante',
    'es-es': 'Principiante',
  },
};

export const SKILL_FREQUENCY_LABELS: Record<string, AppLocalizedText> = {
  FREQUENT: {
    'en-us': 'Frequent',
    'pt-BR': 'Frequente',
    'es-es': 'Frecuente',
  },
  OCCASIONAL: {
    'en-us': 'Occasional',
    'pt-BR': 'Ocasional',
    'es-es': 'Ocasional',
  },
  RARE: {
    'en-us': 'Rare',
    'pt-BR': 'Rara',
    'es-es': 'Rara',
  },
};

export const SKILL_CONTEXT_LABELS: Record<TechnologyContextKey, AppLocalizedText> =
  {
    PROFESSIONAL: {
      'en-us': 'Professional',
      'pt-BR': 'Profissional',
      'es-es': 'Profesional',
    },
    PERSONAL: {
      'en-us': 'Personal',
      'pt-BR': 'Pessoal',
      'es-es': 'Personal',
    },
    ACADEMIC: {
      'en-us': 'Academic',
      'pt-BR': 'Academico',
      'es-es': 'Academico',
    },
    STUDY: {
      'en-us': 'Study',
      'pt-BR': 'Estudo',
      'es-es': 'Estudio',
    },
  };

export const SKILL_GROUP_TONES: Record<string, ContainerTone> = {
  FRAMEWORK: 'primary',
  LANGUAGE: 'success',
  DATABASE: 'warning',
  DEVOPS: 'info',
  LIBRARY: 'secondary',
  ORM: 'base',
};

export const SKILL_GROUP_ICON_NAMES: Record<string, string> = {
  FRAMEWORK: 'LuBlocks',
  LANGUAGE: 'LuCpu',
  LIBRARY: 'LuPackage',
  DATABASE: 'LuDatabase',
  DEVOPS: 'LuCloud',
  ORM: 'LuDatabase',
};

export const SKILL_VISUALS: Record<string, string> = {
  ajax: '/assets/img/skills/ajax.png',
  angular: '/assets/img/skills/angular.png',
  aws: '/assets/img/skills/aws.png',
  azure: '/assets/img/skills/azure.png',
  bootstrap: '/assets/img/skills/bootstrap.png',
  css: '/assets/img/skills/css.png',
  docker: '/assets/img/skills/docker.png',
  express: '/assets/img/skills/express.png',
  git: '/assets/img/skills/git.png',
  html: '/assets/img/skills/html.png',
  javascript: '/assets/img/skills/javascript.png',
  json: '/assets/img/skills/json.png',
  laravel: '/assets/img/skills/laravel.png',
  mysql: '/assets/img/skills/mysql.png',
  node: '/assets/img/skills/node.png',
  php: '/assets/img/skills/php.png',
  postgresql: '/assets/img/skills/postgresql.png',
  react: '/assets/img/skills/react.png',
  sql: '/assets/img/skills/sql.png',
  swagger: '/assets/img/skills/swagger.png',
  typescript: '/assets/img/skills/typescript.png',
};

export const resolveSkillGroupDescription = (
  locale: AppLocale,
  count: number,
): string =>
  SKILL_FALLBACK_LABELS.groupDescription[locale]?.replace(
    '{{count}}',
    String(count),
  ) ??
  SKILL_FALLBACK_LABELS.groupDescription['en-us']!.replace(
    '{{count}}',
    String(count),
  );
