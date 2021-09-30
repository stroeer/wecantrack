export type NetworkAccount = {
  id: number;
  created_at: string;
  updated_at: string;
  disabled_at: string;
  network_id: string;
  name: string;
  tags: null;
  enabled: number;
};

export type NetworkAccountRequest = {
  ids: number[];
};

export class NetworkAccountRequestBuilder {
  private request: NetworkAccountRequest;
  constructor() {
    this.request = {
      ids: [],
    };
  }

  id(id: number): NetworkAccountRequestBuilder {
    this.request.ids.push(id);
    return this;
  }

  build(): NetworkAccountRequest {
    return this.request;
  }
}
