export type WCTDate = `${number | string}-${number | string}-${number | string}T${number | string}:${number | string}:${
  | number
  | string}`;

export type DateType = 'order_date' | 'modified_date' | 'click_date' | 'validation_date' | 'last_wct_update';

export type Link = {
  url: string;
  label: string;
  active: boolean;
};

export type GeneralResponseData = {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page_url: string;
  last_page: number;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};
