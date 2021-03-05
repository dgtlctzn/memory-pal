import React, {useState} from "react";
// import { Button } from "reactstrap";

import AddEvent from "../../components/AddEvent/AddEvent.jsx";

const Home = () => {
  const [modal, setModal] = useState(false);

  const handleToggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <h1>This is the home page</h1>
      <AddEvent handleToggle={handleToggle} modal={modal}/>
    </div>
  );
};

export default Home;
