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
  let curr;
  if (type === "Birthday" || type === "Holiday") {
    const year = currentDate.year();
    const month = event.month();
    const day = event.date();

    const thisYearsEvent = moment().year(year).month(month).date(day);
    const nextYearsEvent = moment()
      .year(year + 1)
      .month(month)
      .date(day);
    const cb = thisYearsEvent.diff(currentDate, "days");
    const nb = nextYearsEvent.diff(currentDate, "days");

    curr = cb < nb ? cb : nb;
    const next = cb < nb ? nb : cb;
    if (curr < 0) {
      return next;
    }
  } else {
    curr = event.diff(currentDate, "days");
  }
  return curr;
};

const daysToString = (daysAway) => {
  if (!daysAway) {
    return "today!";
  } else if (daysAway < 0) {
    return "past";
  } else {
    return daysAway.toString();
  }
};

const TableBody = ({ name, dateItems, eventType }) => {
  const now = moment();

  const newDateItems = dateItems.map((item) => {
    const momentDate = moment(item.date);
    const { type, name } = item;
    const daysAway = relativeDate(now, momentDate, type);
    const formDate = formatDate(momentDate, type);
    return {
      daysAway,
      formDate,
      type,
      name
    };
  });

  newDateItems.sort((a, b) => a.daysAway - b.daysAway);

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
        {newDateItems.map(({ daysAway, formDate, type, name }, index) => {
          if (type === eventType) {
            return (
              <TableRow
                key={`${index + 1}`}
                date={formDate}
                name={name}
                daysAway={daysToString(daysAway)}
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
