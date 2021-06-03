import "./App.css";

import React from "react";
import Navbars from "./components/Navbars";
import axios from "axios";
import Datalist from "./components/Datalist";
import User from "./components/User";

function App() {
  const [inp, setInp] = React.useState("");
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});
  const handleChange = async (e) => {
    setVisible(true);
    setInp(e.target.value);

    await axios
      .post("https://stock-mern-app.herokuapp.com/search", { inp })
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (user) => {
    setVisible(false);
    setUser(user);
    setShow(true);
  };

  return (
    <div className="App">
      <Navbars />

      <div>
        <h1>
          The easiest way to buy <br></br> and sell stocks
        </h1>
        <p>
          Stock analysis and screening tool for <br></br>investers in india
        </p>
        <div class="form">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input type="text" onChange={handleChange}></input>
        </div>
      </div>
      {visible ? <Datalist data={data} handleClose={handleClose} /> : null}
      {show ? <User user={user} /> : null}
    </div>
  );
}

export default App;
