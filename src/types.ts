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
