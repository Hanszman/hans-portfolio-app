export interface DashboardDistributionEntryResponse {
  key: string;
  count: number;
}

export interface DashboardSummaryCountersResponse {
  projects: number;
  experiences: number;
  technologies: number;
  formations: number;
  customers: number;
  jobs: number;
  spokenLanguages: number;
}

export interface DashboardStackDistributionEntryResponse {
  slug: string;
  namePt: string;
  nameEn: string;
  projectCount: number;
  technologyCount: number;
}

export interface DashboardStackDistributionResponse {
  generatedAtUtc: string;
  stacks: DashboardStackDistributionEntryResponse[];
}

export interface DashboardProjectContextsResponse {
  generatedAtUtc: string;
  totalProjects: number;
  featuredProjects: number;
  highlightedProjects: number;
  contexts: DashboardDistributionEntryResponse[];
  environments: DashboardDistributionEntryResponse[];
}

export interface DashboardTopTechnologyEntryResponse {
  slug: string;
  name: string;
  category: string;
  usageCount: number;
}

export interface DashboardTechnologyUsageResponse {
  generatedAtUtc: string;
  totalUsageLinks: number;
  levels: DashboardDistributionEntryResponse[];
  frequencies: DashboardDistributionEntryResponse[];
  contexts: DashboardDistributionEntryResponse[];
  sources: DashboardDistributionEntryResponse[];
  topTechnologies: DashboardTopTechnologyEntryResponse[];
}

export interface DashboardTimelineItemResponse {
  slug: string;
  companyName: string;
  titlePt: string;
  titleEn: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  highlight: boolean;
  jobs: string[];
  customers: string[];
  projects: string[];
  technologies: string[];
  imagePath: string | null;
}

export interface DashboardProfessionalTimelineResponse {
  generatedAtUtc: string;
  totalItems: number;
  items: DashboardTimelineItemResponse[];
}

export interface DashboardHighlightItemResponse {
  entity: string;
  slug: string;
  titlePt: string;
  titleEn: string;
  subtitlePt?: string;
  subtitleEn?: string;
  icon?: string | null;
  imagePath?: string | null;
  featured?: boolean;
}

export interface DashboardHighlightsResponse {
  generatedAtUtc: string;
  totalItems: number;
  items: DashboardHighlightItemResponse[];
}

export interface DashboardOverviewResponse {
  generatedAtUtc: string;
  summary: DashboardSummaryCountersResponse;
  stackDistribution: DashboardStackDistributionResponse;
  projectContexts: DashboardProjectContextsResponse;
  technologyUsage: DashboardTechnologyUsageResponse;
  professionalTimeline: DashboardProfessionalTimelineResponse;
  highlights: DashboardHighlightsResponse;
}
