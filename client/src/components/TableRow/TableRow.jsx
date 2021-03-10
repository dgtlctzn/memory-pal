import React from "react";
import PropTypes from "prop-types";

const TableRow = ({date, name, difference}) => {
  return (
    <tr>
      <th scope="row">{difference}</th>
      <td>{name}</td>
      <td>{date}</td>
    </tr>
  );
};

TableRow.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    difference: PropTypes.string
};

export default TableRow;
