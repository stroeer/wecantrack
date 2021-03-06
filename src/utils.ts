import fetch from 'node-fetch';
import { BASE_URL, Endpoint } from './config';
import { buildQueryParams, range } from './helper';
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
): Promise<[T, number]> {
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
      const body = await result.json() as T
      const remainingRateLimit = parseInt(result.headers.get('X-RateLimit-Remaining'), 10) ?? 0
      return [body, remainingRateLimit]
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
    const [firstPage, remaining] = await getSinglePage(request, endpoint, key);
    let result = null;
    if (isPageRequest(request)) {
      const nrOfPages = firstPage.last_page > remaining ? remaining : firstPage.last_page
      const pages = await Promise.all(
        range(2, nrOfPages).map(async (l): Promise<T> => {
          const req = Object.assign({}, request) as object & { page: number };
          req.page = l;
          return await getSinglePage(req, endpoint, key)[0];
        }),
      );
      result = firstPage.data.concat(...pages.map((p) => p.data)) as T['data'];
    } else {
      result = firstPage.data as T['data'];
    }
    return result;
  } catch (e) {
    error('It was not possible to fetch all pages', e);
  }
}

const isPageRequest = (request: object): boolean => {
  return Object.keys(request).includes('page');
};
