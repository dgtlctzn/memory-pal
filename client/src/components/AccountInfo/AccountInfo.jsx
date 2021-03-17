import React from "react";
import PropTypes from "prop-types";

const AccountInfo = ({ title, value }) => {
  return (
    <tr>
      <th scope="row">{title}</th>
      <td>{value}</td>
    </tr>
  );
};

AccountInfo.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
};

export default AccountInfo;
