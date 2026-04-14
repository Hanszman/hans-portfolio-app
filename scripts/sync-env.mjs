import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const projectRoot = process.cwd();
const envFilePath = resolve(projectRoot, '.env');
const envExampleFilePath = resolve(projectRoot, '.env.example');
const generatedEnvironmentFilePath = resolve(
  projectRoot,
  'src/environments/environment.generated.ts',
);

const readEnvironmentSource = () => {
  if (existsSync(envFilePath)) {
    return readFileSync(envFilePath, 'utf8');
  }

  if (existsSync(envExampleFilePath)) {
    return readFileSync(envExampleFilePath, 'utf8');
  }

  throw new Error(
    'No environment source file was found. Create .env or .env.example before running env:sync.',
  );
};

const parseEnvironmentFile = (source) =>
  source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .reduce((environmentMap, line) => {
      const separatorIndex = line.indexOf('=');

      if (separatorIndex < 0) {
        return environmentMap;
      }

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();
      const normalizedValue = rawValue.replace(/^['"]|['"]$/g, '');

      return {
        ...environmentMap,
        [key]: normalizedValue,
      };
    }, {});

const environmentSource = readEnvironmentSource();
const parsedEnvironment = parseEnvironmentFile(environmentSource);
const apiBaseUrl = parsedEnvironment.PORTFOLIO_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    'PORTFOLIO_API_BASE_URL is required in .env or .env.example for env:sync.',
  );
}

mkdirSync(dirname(generatedEnvironmentFilePath), { recursive: true });

writeFileSync(
  generatedEnvironmentFilePath,
  `export const environment = {
  PORTFOLIO_API_BASE_URL: ${JSON.stringify(apiBaseUrl)},
} as const;
`,
  'utf8',
);
