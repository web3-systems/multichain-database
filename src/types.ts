import { BigNumberish } from '@ethersproject/bignumber';
import { Log } from '@ethersproject/providers';
import { AccessListish } from '@ethersproject/transactions';

export interface Database extends Loki {}

export interface StoreSchema {
  name: string;
  id: string;
  unique: Array<string>;
  indexed: Array<string>;
  included: Array<string>;
}

export interface DynamicViewOptions {
  persistent: boolean;
  sortPriority: string;
  minRebuildInterval: number;
}

export interface FindQuery {
  [key: string]: any;
}

export interface ChainedQuery {
  find?: FindQuery;
  where?: any;
  simplesort?: any;
  offset?: any;
  limit?: any;
}

export interface Hook {
  event: 'insert' | 'update' | 'remove' | 'findAndRemove' | 'findAndUpdate';
  callback: (collection: string, data?: any) => void;
}

export interface Account {
  address: string;
  chainId: number;
  balance: BigNumberish;
  nonce: number;
  inbound: number;
}

export interface AccountMeta {
  address: string;
  chainBase?: number;
  chainsActive?: number[];
  chains?: [];
}

export interface Contracts {
  chainId: number;
  address: string;
  timestamp?: string;
  abi?: any;
  bytecode?: string;
  name?: string;
  from?: string;
  blockNumber?: number;
}

export interface TransactionAndReceipt {
  hash?: string;
  to?: string;
  from?: string;
  nonce: number;
  gasLimit: BigNumberish;
  gasPrice?: BigNumberish;
  data: string;
  value: BigNumberish;
  chainId: number;
  r?: string;
  s?: string;
  v?: number;
  type?: number | null;
  accessList?: AccessListish;
  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumberish;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Array<Log>;
  blockNumber?: number;
  confirmations?: number;
  cumulativeGasUsed?: BigNumberish;
  effectiveGasPrice?: BigNumberish;
  byzantium: boolean;
  status?: number;
}
