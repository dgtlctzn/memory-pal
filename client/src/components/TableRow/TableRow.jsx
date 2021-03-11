import React from "react";
import PropTypes from "prop-types";

const TableRow = ({day_id, date, name, daysAway, handleEdit}) => {
  return (
    <tr onClick={handleEdit} value={day_id}>
      <th scope="row">{name}</th>
      <td>{daysAway}</td>
      <td>{date}</td>
    </tr>
  );
};

TableRow.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    daysAway: PropTypes.string,
    handleEdit: PropTypes.func,
    day_id: PropTypes.number
};

export default TableRow;
