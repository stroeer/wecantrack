import { add } from './helper';
import { GeneralResponseData } from './types';

type CustomIndex = `custom_index_${number}`;
type GroupBy = 'networks' | 'network_accounts' | CustomIndex;
type OrderBy = 'clicks' | 'commissions' | 'sales' | CustomIndex;
type OrderDirection = 'desc' | 'asc';

export type ClickoutRequest = {
  last_clicks: number; // max 75000
  group_by?: string;
  [key: `custom_index_${number}`]: string;
  networks?: string;
  network_accounts?: string;
  order_by?: OrderBy;
  order_direction?: OrderDirection;
  page?: number;
  limit?: number; // max 1000
};

export type ClickoutResponse = GeneralResponseData & {
  data: ClickoutData[];
};

export type ClickoutData = {
  [key: `custom_index_${number}`]: string;
  total_commission_USD?: number;
  total_commission_EUR: number;
  clicks: number;
  sales: number;
  network_id?: string;
};

export class ClickoutRequestBuilder {
  private request: ClickoutRequest;

  constructor() {
    this.request = {
      last_clicks: null,
    };
  }

  clicks(n: number): ClickoutRequestBuilder {
    this.request.last_clicks = n;
    return this;
  }

  index(index: number, value: string): ClickoutRequestBuilder {
    this.request[`custom_index_${index}`] = value;
    return this;
  }

  groupBy(by: GroupBy): ClickoutRequestBuilder {
    this.request.group_by = add(by, this.request.group_by);
    return this;
  }

  network(network: string): ClickoutRequestBuilder {
    this.request.networks = add(network, this.request.networks);
    return this;
  }

  account(account: string): ClickoutRequestBuilder {
    this.request.network_accounts = add(account, this.request.network_accounts);
    return this;
  }

  orderBy(orderBy: OrderBy): ClickoutRequestBuilder {
    this.request.order_by = orderBy;
    return this;
  }

  orderDirection(direction: OrderDirection): ClickoutRequestBuilder {
    this.request.order_direction = direction;
    return this;
  }

  page(page: number): ClickoutRequestBuilder {
    this.request.page = page;
    return this;
  }

  limit(limit: number): ClickoutRequestBuilder {
    this.request.limit = limit;
    return this;
  }

  build(): ClickoutRequest {
    if (typeof this.request.last_clicks === 'number') {
      return this.request;
    } else {
      return null;
    }
  }
}
