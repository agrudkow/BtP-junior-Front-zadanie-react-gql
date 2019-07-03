import React from "react";
import { withRouter } from "react-router-dom";

const Film = ({
  match: {
    params: { id },
  },
}) => {
  return <div>Film id: {id}</div>;
};

export default withRouter(Film);
