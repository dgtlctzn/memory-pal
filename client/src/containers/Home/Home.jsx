import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";

import "./Home.css";
import AddEvent from "../../components/AddEvent/AddEvent.jsx";
import API from "../../util/API.js";
import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";
import LoadingTable from "../../components/LoadingTable/LoadingTable.jsx";
import NavBarAuth from "../../components/NavBarAuth/NavBarAuth.jsx";
import NewPopover from "../../components/NewPopover/NewPopover.jsx";
import TableBody from "../../components/TableBody/TableBody.jsx";
import ThinkingContext from "../../Context/ThinkingContext";

const Home = () => {
  const { jwt, setJwt, username } = useContext(AuthContext);
  const { thinking, setThinking } = useContext(ThinkingContext);
  const { cookie, removeCookie } = useContext(CookieContext);

  const [date, setDate] = useState(new Date());
  const [dateItems, setDateItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const [event, setEvent] = useState("Select");
  const [eventID, setEventID] = useState(0);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [page, setPage] = useState(0);
  const [recurring, setRecurring] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    getTableInfo();
  }, []);

  const getTableInfo = async () => {
    try {
      setThinking({ ...thinking, table: true });
      const datetime = new Date().toLocaleString();
      const { data } = await API.getEvents(cookie.c1, datetime);
      setThinking({ ...thinking, table: false });
      togglePopover(data);
      // console.log(data);
      setDateItems(data.info);
    } catch (err) {
      console.log(err);
      setThinking({ ...thinking, table: false });
    }
  };

  const handleToggle = () => {
    setEdit(false);
    setEventID(0);
    setModal(!modal);
    setEvent("Select");
    setName("");
    setReminders([]);
    setRecurring(false);
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
      case "Holiday":
        setDate(new Date(2021, 1, 14));
        setName("Valentine's Day");
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
        setThinking({ ...thinking, add: true });
        await API.addEvent(
          jwt,
          message,
          event,
          name,
          reminders,
          date.toUTCString(),
          recurring
        );
        // console.log(data);
        setThinking({ ...thinking, add: true });
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
      setThinking({ ...thinking, edit: true });
      await API.deleteEvent(jwt, eventID);
      const { data } = await API.addEvent(
        jwt,
        message,
        event,
        name,
        reminders,
        date.toUTCString(),
        recurring
      );
      setThinking({ ...thinking, edit: false });
      handleToggle();
      getTableInfo();
    } catch (err) {
      setThinking({ ...thinking, edit: false });
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setThinking({ ...thinking, delete: true });
      await API.deleteEvent(jwt, eventID);
      setThinking({ ...thinking, delete: false });
      getTableInfo();
      handleToggle();
    } catch (err) {
      setThinking({ ...thinking, delete: false });
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
      const currDate = moment(info.date);
      setDate(new Date(currDate.year(), currDate.month(), currDate.date()));
      setEvent(info.type);
      setMessage(info.message);
      setRecurring(info.recurring);
      setName(info.name);
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

  const handleRecurringCheck = () => {
    setRecurring(!recurring);
  };

  const handleLogOut = () => {
    removeCookie("c1");
    setJwt("");
  };

  const togglePopover = (res) => {
    if (!res.info.length || res.info.length === 1) {
      setNewUser(!newUser);
      setTimeout(() => {
        setNewUser(false);
      }, 6000);
    }
  };

  return (
    <div>
      <NavBarAuth handleLogOut={handleLogOut} />
      <Container>
        <Row className="type-col">
          <Col xs="12" md="4">
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
              handleRecurringCheck={handleRecurringCheck}
              recurring={recurring}
            />
            {newUser ? (
              <NewPopover
                togglePopover={togglePopover}
                newUser={newUser}
                username={username}
              />
            ) : (
              ""
            )}
          </Col>
          <Col xs="12" md="4">
            <h5 className="calendar-info text-left">
              {moment().format("dddd, MMMM Do YYYY")}
            </h5>
          </Col>
          <Col xs="12" md="4">
            {username ? (
              <h5 className="calendar-info">
                {username}&apos;s Reminder Calendar
              </h5>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <div className="type-col">
              <h2>&#127874; Birthdays</h2>
              <div className="table-box">
                {thinking.table ? (
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
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="type-col">
              <h2>&#127881; Holidays</h2>
              <div className="table-box">
                {thinking.table ? (
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
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <div className="type-col">
              <h2>&#128198; Other</h2>
              <div className="table-box">
                {thinking.table ? (
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
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="type-col">
              <h2>&#10071; Cancel Subscriptions</h2>
              <div className="table-box">
                {thinking.table ? (
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
