import React from "react";
import PropTypes from "prop-types";
import { Progress, Table } from "reactstrap";

const LoadingTable = ({name}) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>{name}</th>
            <th>Days Away</th>
            <th>Date</th>
          </tr>
        </thead>
      </Table>
      <Progress animated color="info" value={100} />
    </div>
  );
};

LoadingTable.propTypes = {
    name: PropTypes.string
};

export default LoadingTable;
