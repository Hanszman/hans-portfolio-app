import {
  buildAssetUrl,
  buildRelativeExperienceImageAssetPath,
  normalizeAssetSlug,
} from '../../../core/api/api.config';

export const resolveProjectCompanyLogoUrl = (companyName: string): string =>
  buildAssetUrl(buildRelativeExperienceImageAssetPath(`${normalizeAssetSlug(companyName)}.jpg`));
