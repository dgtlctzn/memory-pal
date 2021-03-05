import React, { useState } from "react";
// import { Button } from "reactstrap";

import AddEvent from "../../components/AddEvent/AddEvent.jsx";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(4);
  const [date, setDate] = useState(new Date());

  const handleToggle = () => {
    setModal(!modal);
  };

  const handleSelectEvent = (e) => {
    setEvent(e.target.value);
  };

  return (
    <div>
      <h1>This is the home page</h1>
      <AddEvent
        handleToggle={handleToggle}
        modal={modal}
        handleSelectEvent={handleSelectEvent}
        setDate={setDate}
        date={date}
        event={event}
      />
    </div>
  );
};

export default Home;
