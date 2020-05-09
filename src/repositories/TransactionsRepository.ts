import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceWithoutTotal = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        const balance = accumulator;

        switch (transaction.type) {
          case 'income':
            balance.income += transaction.value;
            break;
          case 'outcome':
            balance.outcome += transaction.value;
            break;
          default:
            break;
        }

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const balance = balanceWithoutTotal;
    balance.total = balanceWithoutTotal.income - balanceWithoutTotal.outcome;

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
