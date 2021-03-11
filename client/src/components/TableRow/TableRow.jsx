import React from "react";
import PropTypes from "prop-types";

const TableRow = ({date, name, daysAway}) => {
  return (
    <tr>
      <th scope="row">{name}</th>
      <td>{daysAway}</td>
      <td>{date}</td>
    </tr>
  );
};

TableRow.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    daysAway: PropTypes.string
};

export default TableRow;
