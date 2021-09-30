import {
  getTotalTransactions,
  getTransationsPage,
  Transaction,
  TransactionRequest,
  TransactionResponse,
} from './transactions';

export class API {
  constructor(private key: string) {}

  async transactionsPage(request: TransactionRequest): Promise<TransactionResponse> {
    return getTransationsPage(request, this.key);
  }

  async transactionsTotal(request: TransactionRequest): Promise<Transaction[]> {
    return getTotalTransactions(request, this.key);
  }
}
