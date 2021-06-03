import React from "react";

function User({ user }) {
  return (
    <div>
     
      <h6>Name:{user.Name}</h6>
      <h6>Current_Market_Price: {user.Current_Market_Price}</h6>
      <h6>Market_Cap{user.Market_Cap}</h6>
      <h6>Stock_P_E:{user.Stock_P_E}</h6>
      <h6>Dividend_Yield:{user.Dividend_Yield}</h6>
      <h6>ROCE:{user.ROCE}</h6>
      <h6>ROE_Previous_Annum:{user.ROE_Previous_Annum}</h6>
      <h6>Debt_to_Equity:{user.Debt_to_Equity}</h6>
      <h6>EPS:{user.EPS}</h6>
      <h6>Reserve:{user.Reserve}</h6>
      <h6> Debt: {user.Debt}</h6>
    </div>
  );
}

export default User;
