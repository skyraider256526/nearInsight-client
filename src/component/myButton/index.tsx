import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default props => {
  const { children, onClick, tip } = props;
  return (
    <Tooltip title={tip} placement="top" className={props.tipClassName}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};
