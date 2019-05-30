import React from "react";
import './Field.css'

const field = props => {

  return (
    <div className="Field" onClick={props.click}>
      <div> {props.symbol} </div>
    </div>
  );
};

export default field;
