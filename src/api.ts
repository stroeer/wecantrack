import { ClickoutData, ClickoutRequest, ClickoutResponse } from './clickout';
import { Endpoint } from './config';
import { NetworkAccount, NetworkAccountRequest } from './network-accounts';
import { Network } from './networks';
import { TransactionData, TransactionRequest, TransactionResponse } from './transactions';
import { getAllPages, getArrayPage, getSinglePage } from './utils';

export class WeCanTrack {
  constructor(private key: string) {}

  async transactionsPage(request: TransactionRequest): Promise<TransactionResponse> {
    return getSinglePage(request, Endpoint.TRANSACTIONS, this.key);
  }

  async transactionsTotal(request: TransactionRequest): Promise<TransactionData[]> {
    return getAllPages(request, Endpoint.TRANSACTIONS, this.key);
  }

  async clickoutsPage(request: ClickoutRequest): Promise<ClickoutResponse> {
    return getSinglePage(request, Endpoint.CLICKOUTS, this.key);
  }

  async clickoutsTotal(request: ClickoutRequest): Promise<ClickoutData[]> {
    return getAllPages(request, Endpoint.CLICKOUTS, this.key);
  }

  async networks(): Promise<Network[]> {
    return getArrayPage({}, Endpoint.NETWORKS, this.key);
  }

  async networkAccounts(request: NetworkAccountRequest): Promise<NetworkAccount[]> {
    return getArrayPage(request, Endpoint.NETWORK_ACCOUNTS, this.key);
  }
}
