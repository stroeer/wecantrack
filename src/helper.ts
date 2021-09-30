import { WCTDate } from './types';

function reduceArrayParam(params: string[], name: string): string {
    return params.reduce((res, p, i) => {
        res += `${i === 0 ? '' : '&'}${name}[]=${p}`;
        return res;
    }, '');
}

export function buildQueryParams(params: object): string {
    const result = Object.keys(params).reduce((result, param) => {
        return (result +=
            typeof params[param] !== 'undefined' && params[param] !== null
                ? Array.isArray(params[param])
                    ? `${result === '' ? '' : '&'}${reduceArrayParam(params[param], param)}`
                    : `${result === '' ? '' : '&'}${param}=${params[param]}`
                : '');
    }, '');
    return result;
}

function withLeadingZero(n: number): string {
    return ('0' + n).slice(-2);
}

export function convertDateToWCTDate(date: Date): WCTDate {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${withLeadingZero(month)}-${withLeadingZero(day)}T${withLeadingZero(hour)}:${withLeadingZero(
        minutes,
    )}:${withLeadingZero(seconds)}`;
}
