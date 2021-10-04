import { convertDateToWCTDate } from './helper';
import { DateType, GeneralResponseData } from './types';

const FILE: string = 'wecantrack/wct_api/transactions.ts';

type TransactionStatus = 'pending' | 'approved' | 'declined';

export type TransactionData = {
  transaction_id: string;
  last_wct_update: string;
  modified_date: string;
  network_id: string;
  user_network_account_id: number;
  reference: string;
  sub_ids: { subid1: string; subid2: string; subid3: string };
  sale_amount: string;
  commission_amount: string;
  sale_amount_euro: string;
  commission_amount_euro: string;
  currency_id: string;
  status: TransactionStatus;
  order_date: string;
  click_date: null;
  validation_date: string;
  advertiser_id: string;
  advertiser_name: string;
  decline_reason: string;
  order_ref: string;
  clickout_url: string;
  gcid: string;
  click_metadata: {
    event: string;
    dataLayer: string;
    eventLabel: string;
    utm_medium: string;
    utm_source: string;
    eventAction: string;
    landing_page: string;
    utm_campaign: string;
    eventCategory: string;
    extra_shop_id: string;
    extra_shop_name: string;
    non_interaction: string;
    extra_widget_typ: string;
    extra_category_id: string;
    extra_category_name: string;
    extra_produkt_title: string;
    article_content_type: string;
  };
};

export type TransactionResponse = GeneralResponseData & {
  data: TransactionData[];
};

export type TransactionRequest = {
  date_type: DateType;
  start_date: string;
  end_date: string;
  status?: TransactionStatus[];
  network_id?: string;
  network_account_id?: number;
  network_account_tags?: string[];
  page?: number;
  limit?: number;
};

export class TransactionRequestBuilder {
  private request: TransactionRequest;

  constructor() {
    this.request = {
      date_type: null,
      end_date: null,
      start_date: null,
      page: 1,
      status: [],
    };
  }

  dateType(type: DateType): TransactionRequestBuilder {
    this.request.date_type = type;
    return this;
  }

  start(date: Date): TransactionRequestBuilder {
    this.request.start_date = convertDateToWCTDate(date);
    return this;
  }

  end(date: Date): TransactionRequestBuilder {
    this.request.end_date = convertDateToWCTDate(date);
    return this;
  }

  status(status: TransactionStatus): TransactionRequestBuilder {
    this.request.status.push(status);
    return this;
  }

  network(id: string): TransactionRequestBuilder {
    this.request.network_id = id;
    return this;
  }

  account(id: number): TransactionRequestBuilder {
    this.request.network_account_id = id;
    return this;
  }

  tags(tags?: string[]): TransactionRequestBuilder {
    this.request.network_account_tags = tags;
    return this;
  }

  page(page?: number): TransactionRequestBuilder {
    this.request.page = page;
    return this;
  }

  limit(limit?: number): TransactionRequestBuilder {
    this.request.limit = limit;
    return this;
  }

  build(): TransactionRequest {
    if (this.request.date_type && this.request.end_date && this.request.start_date) {
      return this.request;
    }
    return null;
  }
}
