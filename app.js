app.js

// YOUR DERIV APP ID
const app_id = "33p7PVqGTbhzPMv1GNtXr";

// YOUR DERIV TOKEN
const token = "pat_df0cbb0150b40589d016c49888fea3098f54ef3d5dde910f8e0ac4ef9f9fb0f5";

// CONNECT TO DERIV
const connection = new WebSocket(
  `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
);

// CREATE CHART
const chart = LightweightCharts.createChart(
  document.getElementById("chart-container"),
  {
    layout:{
      background:{
        color:"#0d1728"
      },
      textColor:"#DDD"
    },

    grid:{
      vertLines:{
        color:"#122033"
      },
      horzLines:{
        color:"#122033"
      }
    },

    width:
      document.getElementById(
        "chart-container"
      ).clientWidth,

    height:
      document.getElementById(
        "chart-container"
      ).clientHeight
  }
);

const candleSeries =
  chart.addCandlestickSeries();

// WHEN CONNECTED
connection.onopen = () => {

  // AUTHORIZE ACCOUNT
  connection.send(
    JSON.stringify({
      authorize: token
    })
  );

  // LIVE MARKET
  connection.send(
    JSON.stringify({
      ticks:"R_75",
      subscribe:1
    })
  );
};

let lastPrice = null;

let time =
  Math.floor(Date.now()/1000);

// RECEIVE DATA
connection.onmessage = (msg) => {

  const data =
    JSON.parse(msg.data);

  // BALANCE
  if(data.authorize){

    document:[Account Management](/docs/account)

# Balance

Auth required

Get the account's balance

## Request & Response

## Request Schema

#### `balance` — Required `integer | enum`

Must be `1`

Allowed values: `1`

#### `subscribe` — Optional `integer | enum`

[Optional] If set to 1, will send updates whenever the balance changes.

Allowed values: `0`, `1`

#### `passthrough` — Optional `object`

[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field.

#### `req_id` — Optional `integer`

[Optional] Used to map request to response.

## Response Schema

#### `balance` — Optional `object`

Current balance of one or more accounts.

**Object Properties:**

  ##### `balance` — Required `number`

  Balance of current account.

  Min: 0

  ##### `currency` — Required `string`

  Currency of current account.

  Pattern: `^(|[a-zA-Z0-9]{2,20})$`

  ##### `id` — Optional `string`

  A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.

  ##### `loginid` — Required `string`

  Client loginid.

  Pattern: `^[A-Z]{2,4}[0-9]{1,10}$`

#### `subscription` — Optional `object`

For subscription requests only.

**Object Properties:**

  ##### `id` — Required `string`

  A per-connection unique identifier. Can be passed to the `forget` API call to unsubscribe.

#### `echo_req` — Required `object`

Echo of the request made.

#### `msg_type` — Required `string | enum`

Action name of the request made.

Allowed values: `"balance"`

#### `req_id` — Optional `integer`

Optional field sent in request to map to response, present only when request contains `req_id`.

## Examples

### Request Example

```json
{
  "balance": 1,
  "subscribe": 1,
  "req_id": 3
}
```

### Response Example

```json
{
  "balance": {
    "balance": 10092.59,
    "currency": "USD",
    "id": "5b1f28c2-003d-0044-cc08-8b4d0a7df538",
    "loginid": "VRTC965733"
  },
  "msg_type": "balance",
  "req_id": 3
}
```

##### Subscription

When `subscribe: 1` is sent, the server will push a new balance message whenever the account balance changes. Use the `forget` API with the subscription `id` to stop receiving updates.

##### Authentication Required

This endpoint requires a valid session. Ensure your WebSocket connection is authenticated before calling this endpoint.

## About balance

The `balance` endpoint get the account's balance

This is an account management endpoint. Use it to manage authentication, balances, and account information.
  }

  // LIVE TICKS
  if(data.tick){

    const price =
      parseFloat(
        data.tick.quote
      );

    document.getElementById(
      "v75"
    ).innerText = price;

    if(lastPrice === null){
      lastPrice = price;
    }

    candleSeries.update({

      time: time++,

      open:lastPrice,

      high:Math.max(
        lastPrice,
        price
      ),

      low:Math.min(
        lastPrice,
        price
      ),

      close:price
    });

    lastPrice = price;
  }
};

// BUY CALL
document.getElementById(
  "buyCall"
).onclick = () => {

  connection.send(
    JSON.stringify({

      proposal:1,

      amount:Number(
        document.getElementById(
          "stake"
        ).value
      ),

      basis:"stake",

      contract_type:"CALL",

      currency:"USD",

      duration:1,

      duration_unit:"t",

      symbol:"R_75"
    })
  );
};

// BUY PUT
document.getElementById(
  "buyPut"
).onclick = () => {

  connection.send(
    JSON.stringify({

      proposal:1,

      amount:Number(
        document.getElementById(
          "stake"
        ).value
      ),

      basis:"stake",

      contract_type:"PUT",

      currency:"USD",

      duration:1,

      duration_unit:"t",

      symbol:"R_75"
    })
  );
};
