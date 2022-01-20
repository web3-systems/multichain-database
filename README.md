# Multichain In-Memory Database
![Build](https://github.com/web3-systems/multichain-in-memory-database/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/web3-systems/multichain-in-memory-database/badge.svg?branch=main)](https://coveralls.io/github/web3-systems/multichain-in-memory-database?branch=main)
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
![npm](https://img.shields.io/npm/v/@web3-systems/multichain-in-memory-database)

The `@web3-systems/multichain-in-memory-database` [node module](https://www.npmjs.com/package/@web3-systems/multichain-in-memory-database) is an in-memory database for multichain EVM state: transactions, receipts, logs and memoized computes.

Blockchain state is loaded into the memory for high-performance queries in both the browser and backend systems.

To learn more about indexing, queries, DynamicViews and other database related features reference [LokiJS](http://techfort.github.io/LokiJS/index.html)

# 💾 Installation

Install NPM package:

```sh
npm install @web3-systems/multichain-in-memory-database
```

```sh
yarn add @web3-systems/multichain-in-memory-database
```

Clone from Github:

```sh
git clone https://github.com/web3-systems/multichain-in-memory-database
```

# 📖 Overview

The multichain databases/caches are managed using a `MultichainInMemoryDatabase` instance. The instance is an adapter for the LokiJS multi-environment, in-memory database with performant indexing and queries.

- [LokiJS](http://techfort.github.io/LokiJS/index.html)
- [Query Examples](http://techfort.github.io/LokiJS/tutorial-Query%20Examples.html)
- [Persistance Adapters](http://techfort.github.io/LokiJS/tutorial-Persistence%20Adapters.html)
- [Collection Transforms](http://techfort.github.io/LokiJS/tutorial-Collection%20Transforms.html)
- [Indexing and Query Performance](http://techfort.github.io/LokiJS/tutorial-Indexing%20and%20Query%20performance.html)

# 🏎️ Quickstart

In just a few lines a new chain database can be initialized - enabling advanced search queries in both browsers and backends.

```ts
import MultichainInMemoryDatabase from '@web3-systems/multichain-in-memory-database';
const chainIdDefault = 1;
let inMemoryDatabase: MultichainInMemoryDatabase;
inMemoryDatabase = new MultichainInMemoryDatabase(chainIdDefault);
inMemoryDatabase.initializeDefaultCollections(chainIdDefault, 'indexeddb');
inMemoryDatabase.insertMultiple('transactions', transactionList, chainIdDefault);
const findQuery = {data: { $eq: '0x0' }};
const documents = inMemoryDatabase.find('transactions', findQuery, chainIdDefault);
```

# 🪜 Examples

### Simple Search - FindQuery

**The primary operators currently supported are:**

`$eq` - filter for document(s) with property of (strict) equality <br/>
`$ne` - filter for document(s) with property not equal to provided value <br/>
`$aeq` - filter for document(s) with property of abstract (loose) equality <br/>
`$dteq` - filter for document(s) with date property equal to provided date value <br/>
`$gt` - filter for document(s) with property greater than provided value <br/>
`$gte` - filter for document(s) with property greater or equal to provided value <br/>
`$lt` - filter for document(s) with property less than provided value <br/>
`$lte` - filter for document(s) with property less than or equal to provided value <br/>
`$between` - filter for documents(s) with property between provided vals. <br/>

#### **Find Transaction Hash**
To find a single transaction use a find query with an equal operator matching the hash.

```ts
export interface FindQuery {
  [key: string]: any;
}
```

The `FindQuery` object is similar to a [MongoDB find filter object](https://docs.mongodb.com/manual/reference/method/db.collection.find/).

```ts
const findQuery = {
    hash: { 
        $eq: '0x0' 
    },
};
```

### Advanced Search - ChainedQuery

**ChainedQuery Interface**
All inputs are optional when constucting a chained query.

```ts
export interface ChainedQuery {
  find?: any;
  where?: any;
  simplesort?: any;
  offset?: any;
  limit?: any;
}
```
**Basic ChainedQuery**

A straight-forward example is using `limit` and `find` to return the first a single transaction matching the data inputs.

```ts
const chainedQuery = {
    limit: 1,
    find: {
        data: {
            $eq: '0x2'
        },
    },
};

const documents = inMemoryDatabase.search('transactions', chainedQuery, 1);
/*
    [
        {
            hash: '0x0',
            data: '0x2',
        }
    ]
*/
```

**Complex ChainedQuery**

A straight-forward example is using `limit` and `find` to return the first a single transaction matching the data inputs.

```ts
const chainedQuery = {
    offset: 0,
    limit: 10,
    find: {
        data: {
            $eq: '0x2'
        },
    },
    simplesort: 'blockNumber',
    where: () =>{},
};

const documents = inMemoryDatabase.search('transactions', chainedQuery, 1);
/*
    [
        {
            hash: '0x0',
            data: '0x2',
        }
    ]
*/
```

# 💻 Developer Experience

The package is setup using the [TSDX zero-config CLI](https://tsdx.io/) which includes:

- Typescript
- Rollup
- Jest
- Prettier
- ESLint
