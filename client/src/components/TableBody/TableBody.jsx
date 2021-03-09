import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

import TableRow from "../TableRow/TableRow.jsx";

const TableBody = ({ name, dateItems, type }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{name}</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {dateItems.map((item, index) => {
          if (item.type === type) {
            return <TableRow key={`${index + 1}`} {...item} />;
          }
        })}
      </tbody>
    </Table>
  );
};

TableBody.propTypes = {
  name: PropTypes.string,
  dateItems: PropTypes.array,
};

export default TableBody;
