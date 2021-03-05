import React, { useState } from "react";
// import { Button } from "reactstrap";

import AddEvent from "../../components/AddEvent/AddEvent.jsx";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState(4);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(0);
  const [reminders, setReminders] = useState([]);

  const handleToggle = () => {
    setModal(!modal);
    setTimeout(() => {
      setPage(0);
    }, 500);
  };

  const handleSelectEvent = (e) => {
    setEvent(e.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleAddReminder = (e) => {
    const daysBefore = parseInt(e.target.value);
    if (!reminders.includes(daysBefore)) {
      setReminders([...reminders, daysBefore]);
    } else {
      const newReminders = reminders;
      setReminders([...newReminders.filter((item) => item !== daysBefore)]);
    }
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
        page={page}
        handleNextPage={handleNextPage}
        handleAddReminder={handleAddReminder}
      />
    </div>
  );
};

export default Home;
