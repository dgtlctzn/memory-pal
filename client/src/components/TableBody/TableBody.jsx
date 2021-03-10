import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import moment from "moment";

import TableRow from "../TableRow/TableRow.jsx";

const formatDate = (momentDate, type) => {
  if (type === "Holiday") {
    return momentDate.format("MMMM Do");
  } else {
    return momentDate.format("MMMM Do YYYY");
  }
};

const relativeDate = (currentDate, event, type) => {
  if (type === "Birthday" || type === "Holiday") {
    const year = currentDate.year();
    const month = event.month();
    const day = event.date();

    const thisYearsEvent = moment().year(year).month(month).date(day);
    const nextYearsEvent = moment().year(year + 1).month(month).date(day);
    const cb = thisYearsEvent.diff(currentDate, "days");
    const nb = nextYearsEvent.diff(currentDate, "days");

    const curr = cb < nb ? cb : nb;
    const next = cb < nb ? nb : cb;
    if (!curr) {
      return "today!";
    } else if (curr < 0) {
      return next.toString();
    }
    return curr.toString();
    // if (curr > 30) {
    //   return "> 30";
    // } else if (curr < 0) {
    //   if (next > 30) {
    //     return "> 30";
    //   } else {
    //     return next.toString();
    //   }
    // } else if (!curr) {
    //   return "today!";
    // } else {
    //   return curr.toString();
    // }
  } else {
    const curr = event.diff(currentDate, "days");
    if (!curr) {
      return "today!";
    } else if (curr < 0) {
      return "past";
    }
    return curr.toString();
    // if (curr > 30) {
    //   return "> 30";
    // } else if (!curr) {
    //   return "today!";
    // } else if (curr < 0) {
    //   return "past";
    // } else {
    //   return curr.toString();
    // }
  }
};

const TableBody = ({ name, dateItems, eventType }) => {

  const now = moment();

  return (
    <Table hover dark>
      <thead>
        <tr>
          <th>Days Away</th>
          <th>{name}</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {dateItems.map(({name, type, date}, index) => {
          if (type === eventType) {
            const formDate = moment(date);
            return (
              <TableRow
                key={`${index + 1}`}
                date={formatDate(formDate, type)}
                name={name}
                difference={relativeDate(now, formDate, type, name)}
              />
            );
          }
        })}
      </tbody>
    </Table>
  );
};

TableBody.propTypes = {
  name: PropTypes.string,
  dateItems: PropTypes.array,
  eventType: PropTypes.string,
};

export default TableBody;
