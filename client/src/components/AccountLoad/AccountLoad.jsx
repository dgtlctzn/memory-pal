import React from "react";
import PropTypes from "prop-types";
import { Progress } from "reactstrap";

const AccountLoad = ({ title }) => {
  return (
    <tr>
      <th className="account-row">{title}</th>
      <td>
        <Progress className="user-progress" animated color="info" value={100} />
      </td>
    </tr>
  );
};

AccountLoad.propTypes = {
    title: PropTypes.string,
};

export default AccountLoad;
