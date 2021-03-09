import React from "react";
import PropTypes from "prop-types";

const TableRow = ({date, name}) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>{name}</td>
      <td>{date}</td>
    </tr>
  );
};

TableRow.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string
};

export default TableRow;
