export type WCTDate = `${number | string}-${number | string}-${number | string}T${number | string}:${number | string}:${
    | number
    | string}`;

export type DateType = 'order_date' | 'modified_date' | 'click_date' | 'validation_date' | 'last_wct_update';

export type Link = {
    url: string;
    label: string;
    active: boolean;
};
