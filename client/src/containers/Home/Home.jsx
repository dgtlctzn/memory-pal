import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// import { Button } from "reactstrap";

import "./Home.css";
import AddEvent from "../../components/AddEvent/AddEvent.jsx";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import LoadingTable from "../../components/LoadingTable/LoadingTable.jsx";
import TableBody from "../../components/TableBody/TableBody.jsx";

const Home = () => {
  const { jwt } = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [dateItems, setDateItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [event, setEvent] = useState("Select");
  const [eventID, setEventID] = useState(0);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [reminders, setReminders] = useState([]);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    getTableInfo();
  }, []);

  const getTableInfo = async () => {
    try {
      setThinking(true);
      const datetime = new Date().toLocaleString();
      const { data } = await API.getEvents(jwt, datetime);
      console.log(data);
      setDateItems(data.info);
    } catch (err) {
      console.log(err);
    } finally {
      setThinking(false);
    }
  };

  const handleToggle = () => {
    setEdit(false);
    setEventID(0);
    setModal(!modal);
    setEvent("Select");
    setName("");
    setReminders([]);
    setTimeout(() => {
      setPage(0);
    }, 500);
  };

  const handleSpecials = (event) => {
    switch (event) {
      case "Father's Day":
        setDate(new Date(2021, 5, 20));
        setName("Father's Day");
        break;
      case "Mother's Day":
        setDate(new Date(2021, 4, 9));
        setName("Mother's Day");
        break;
      default:
        break;
    }
  };

  const handleSetEvent = (e) => {
    const selectedDate = e.target.value;
    handleSpecials(selectedDate);
    setEvent(selectedDate);
  };

  const handleNextPage = async () => {
    const newPage = page + 1;
    if (newPage === 2) {
      try {
        const { data } = await API.addEvent(
          jwt,
          message,
          event,
          name,
          reminders,
          date.toLocaleString()
        );
        console.log(data);
        handleToggle();
        getTableInfo();
      } catch (err) {
        console.log(err);
      }
    } else {
      setPage(newPage);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await API.deleteEvent(jwt, eventID);
      const { data } = await API.addEvent(
        jwt,
        message,
        event,
        name,
        reminders,
        date.toLocaleString()
      );
      console.log(data);
      handleToggle();
      getTableInfo();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await API.deleteEvent(jwt, eventID);
      getTableInfo();
      handleToggle();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectEvent = (e) => {
    const rowID = e.target.parentElement.dataset.id;
    setEventID(rowID);
    selectEvent(rowID);
  };

  const selectEvent = async (rowID) => {
    try {
      setModal(true);
      setEdit(true);
      const { data } = await API.selectEvent(jwt, rowID);
      const { info } = data;
      setEvent(info.type);
      setMessage(info.message);
      setName(info.name);
      setDate(new Date(info.date));
      setReminders(info.days_map);
    } catch (err) {
      console.log(err);
    }
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageInput = (e) => {
    if (e.target.value.length <= 300) {
      setMessage(e.target.value);
    }
  };

  return (
    <Container>
      <Row>
        <h1>This is the home page</h1>
        <AddEvent
          handleToggle={handleToggle}
          modal={modal}
          handleSetEvent={handleSetEvent}
          setDate={setDate}
          date={date}
          event={event}
          page={page}
          handleNextPage={handleNextPage}
          handleAddReminder={handleAddReminder}
          handleNameChange={handleNameChange}
          name={name}
          handleMessageInput={handleMessageInput}
          message={message}
          reminders={reminders}
          edit={edit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Row>
      <Row>
        <Col xs="12" md="6">
          <h2>Birthdays</h2>
          <div className="table-box">
            {thinking ? (
              <LoadingTable name="Name" />
            ) : (
              <TableBody
                name="Name"
                eventType="Birthday"
                dateItems={dateItems}
                handleSelectEvent={handleSelectEvent}
              />
            )}
          </div>
        </Col>
        <Col xs="12" md="6">
          <h2>Holidays</h2>
          <div className="table-box">
            {thinking ? (
              <LoadingTable name="Name" />
            ) : (
              <TableBody
                name="Name"
                eventType="Holiday"
                dateItems={dateItems}
                handleSelectEvent={handleSelectEvent}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <h2>Other</h2>
          <div className="table-box">
            {thinking ? (
              <LoadingTable name="Name" />
            ) : (
              <TableBody
                name="Name"
                eventType="Other"
                dateItems={dateItems}
                handleSelectEvent={handleSelectEvent}
              />
            )}
          </div>
        </Col>
        <Col xs="12" md="6">
          <h2>Cancel Subscriptions</h2>
          <div className="table-box">
            {thinking ? (
              <LoadingTable name="Service" />
            ) : (
              <TableBody
                name="Service"
                eventType="Cancel Subscription"
                dateItems={dateItems}
                handleSelectEvent={handleSelectEvent}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
