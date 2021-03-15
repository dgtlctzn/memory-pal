import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import moment from "moment";

import TableRow from "../TableRow/TableRow.jsx";

const formatDate = (momentDate, type, recurring) => {
  if (type === "Holiday") {
    return momentDate.format("MMMM Do");
  } else if (type === "Other") {
    if (recurring) {
      return momentDate.format("MMMM Do");
    } else {
      return momentDate.format("MMMM Do YYYY");
    }
  } else {
    return momentDate.format("MMMM Do YYYY");
  }
};

const daysToString = (daysAway, recurring) => {
  if (!daysAway) {
    return "today!";
  } else if (daysAway < 0 && !recurring) {
    return "past";
  } else {
    return daysAway.toString();
  }
};

const TableBody = ({ name, dateItems, eventType, handleSelectEvent }) => {
  dateItems.sort((a, b) => a.days_away - b.days_away);

  return (
    <Table hover>
      <thead>
        <tr>
          <th>{name}</th>
          <th>Days Away</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {dateItems.map(({ day_id, days_away, date, type, name, recurring }, index) => {
          if (type === "Father's Day" || type === "Mother's Day") {
            type = "Holiday";
          }
          if (type === eventType) {
            const momentDate = moment(date);
            return (
              <TableRow
                key={`${index + 1}`}
                date={formatDate(momentDate, type, recurring)}
                name={name}
                daysAway={daysToString(days_away, recurring)}
                handleSelectEvent={handleSelectEvent}
                day_id={day_id}
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
  handleEdit: PropTypes.func,
  handleSelectEvent: PropTypes.func,
};

export default TableBody;
