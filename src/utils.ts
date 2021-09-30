import fetch from 'node-fetch';
import { BASE_URL, Endpoint } from './config';
import { buildQueryParams } from './helper';
import { error } from './logger';
import { GeneralResponseData } from './types';

const FILE = 'utils.ts';

export async function getArrayPage<T>(request: object, endpoint: Endpoint, key: string): Promise<T[]> {
  const source = 'getArrayPage';
  try {
    if (request) {
      const queryParams = buildQueryParams(request);
      const url = BASE_URL + endpoint + '?' + queryParams;
      const result = await fetch(url, {
        headers: {
          'X-API-Key': key,
        },
      });
      return (await result.json()) as T[];
    } else {
      error(`${FILE} - ${source}`);
    }
  } catch (e) {
    error(`${FILE} - ${source}`, e);
  }
}

export async function getSinglePage<T extends GeneralResponseData>(
  request: object,
  endpoint: Endpoint,
  key: string,
): Promise<T> {
  const source = 'getSinglePage';
  try {
    if (request) {
      const queryParams = buildQueryParams(request);
      const url = BASE_URL + endpoint + '?' + queryParams;
      const result = await fetch(url, {
        headers: {
          'X-API-Key': key,
        },
      });
      return (await result.json()) as T;
    } else {
      error(`${FILE} - ${source}`);
    }
  } catch (e) {
    error(`${FILE} - ${source}`, e);
  }
}

export async function getAllPages<T extends GeneralResponseData>(
  request: object,
  endpoint: Endpoint,
  key: string,
): Promise<T['data']> {
  try {
    const firstPage = await getSinglePage(request, endpoint, key);
    const pages = await Promise.all(
      firstPage.links
        .filter((l) => parseInt(l.label, 10) && parseInt(l.label, 10) > 1)
        .map(async (l): Promise<T> => {
          const page = await fetch(l.url, {
            headers: {
              'X-API-Key': key,
            },
          });
          return (await page.json()) as T;
        }),
    );
    const result = firstPage.data.concat(...pages.map((p) => p.data)) as T['data'];
    return result;
  } catch (e) {
    error('It was not possible to fetch all pages', e);
  }
}
