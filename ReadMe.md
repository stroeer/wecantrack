# WeCanTrack

[WeCanTrack](https://wecantrack.com) is a solution for affiliate partners to track their revenues.
They provide an [API](https://docs.wecantrack.com/#/?id=we-can-track) which is made typed and made more accessible via this node module.

## Installation

You can install the repository via

```sh
npm install --save @stroeer/wecantrack
```

## Usage

The central object which holds your personal api key is the `WeCanTrack` object.
It gets constructed via

```ts
import { WeCanTrack } from '@stroeer/wecantrack';
const api = new WeCanTrack(myKey) // which you can inject via e.g. an environment variable
```

To create request objects the module provides `RequestBuilder`.

Here an example for the `transactions` api.

```ts
import {
  TransactionRequestBuilder,
  WeCanTrack,
} from '@stroeer/wecantrack';

const API = new WeCanTrack(process.env.WCT_KEY);

const request = new TransactionRequestBuilder();

request
  .start(new Date('2021-09-20'))
  .end(new Date())
  .dateType('order_date');

const result = await API.transactionsTotal(request.build());
```

For convenience reason the WeCanTrack Object provides a function to get results pagewise or in total.
