import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");

  const getSql = async () => {
    try {
      const {data} = await axios({
        method: "GET",
        url: "https://fd30zc1217.execute-api.us-east-1.amazonaws.com/test/",
      });
      console.log(data);
      setName(data[0].name + " is cool!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSql();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{name}</p>
    </div>
  );
};

export default App;
