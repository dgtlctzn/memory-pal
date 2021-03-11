import React from "react";
import PropTypes from "prop-types";

const TableRow = ({day_id, date, name, daysAway, handleSelectEvent}) => {
  return (
    <tr onClick={handleSelectEvent} data-id={day_id}>
      <th scope="row" value={day_id}>{name}</th>
      <td>{daysAway}</td>
      <td>{date}</td>
    </tr>
  );
};

TableRow.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    daysAway: PropTypes.string,
    handleSelectEvent: PropTypes.func,
    day_id: PropTypes.number
};

export default TableRow;
