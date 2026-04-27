import { TechnologyContextKey } from '../../core/api/technologies/technologies.types';
import { AppLocale } from '../../core/translation/translation.types';
import { ContainerTone } from '../../layout/container/container.types';

export interface SkillFilterOption {
  label: string;
  value: string;
  action?: (option: SkillFilterOption) => void;
}

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

export const SKILL_CATEGORY_LABELS: Record<
  string,
  Record<AppLocale, string>
> = {
  FRAMEWORK: { 'en-us': 'Framework', 'pt-BR': 'Framework' },
  LANGUAGE: { 'en-us': 'Language', 'pt-BR': 'Linguagem' },
  LIBRARY: { 'en-us': 'Library', 'pt-BR': 'Biblioteca' },
  DATABASE: { 'en-us': 'Database', 'pt-BR': 'Banco de dados' },
  DEVOPS: { 'en-us': 'DevOps', 'pt-BR': 'DevOps' },
  ORM: { 'en-us': 'ORM', 'pt-BR': 'ORM' },
};

export const SKILL_LEVEL_LABELS: Record<string, Record<AppLocale, string>> = {
  ADVANCED: { 'en-us': 'Advanced', 'pt-BR': 'Avancado' },
  INTERMEDIATE: { 'en-us': 'Intermediate', 'pt-BR': 'Intermediario' },
  BEGINNER: { 'en-us': 'Beginner', 'pt-BR': 'Iniciante' },
};

export const SKILL_FREQUENCY_LABELS: Record<
  string,
  Record<AppLocale, string>
> = {
  FREQUENT: { 'en-us': 'Frequent', 'pt-BR': 'Frequente' },
  OCCASIONAL: { 'en-us': 'Occasional', 'pt-BR': 'Ocasional' },
  RARE: { 'en-us': 'Rare', 'pt-BR': 'Rara' },
};

export const SKILL_CONTEXT_LABELS: Record<
  TechnologyContextKey,
  Record<AppLocale, string>
> = {
  PROFESSIONAL: { 'en-us': 'Professional', 'pt-BR': 'Profissional' },
  PERSONAL: { 'en-us': 'Personal', 'pt-BR': 'Pessoal' },
  ACADEMIC: { 'en-us': 'Academic', 'pt-BR': 'Academico' },
  STUDY: { 'en-us': 'Study', 'pt-BR': 'Estudo' },
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
