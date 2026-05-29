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

    document.getElementById(
      "balance"
    ).innerText =
      "$" +
      data.authorize.balance;
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
