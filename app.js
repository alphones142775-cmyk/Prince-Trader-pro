// Connect to Deriv API
// Login Function
// WebSocket Setup
// Fetch Live Prices
// Buy Trade
// Sell Trade
// Update Balance
// Load Trade History
// BUY CALL
document.getElementById(
  "buyCall"
).onclick = async () => {

  const stake = Number(
    document.getElementById(
      "stake"
    ).value
  );

  // REQUEST PROPOSAL
  connection.send(
    JSON.stringify({

      proposal:1,

      amount: stake,

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
).onclick = async () => {

  const stake = Number(
    document.getElementById(
      "stake"
    ).value
  );

  connection.send(
    JSON.stringify({

      proposal:1,

      amount: stake,

      basis:"stake",

      contract_type:"PUT",

      currency:"USD",

      duration:1,

      duration_unit:"t",

      symbol:"R_75"

    })
  );

};
