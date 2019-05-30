import React from "react";
import "./Result.css";

const result = props => {
  return (
    <div className="Result">
      {props.status ? (
        <div>
          <h3>Result</h3>
          {props.tie ? (
            <p>The game was a tie.</p>
          ) : (
            <p>Player {props.player.name} wins!</p>
          )}
          <button onClick={props.click}>New Game</button>
        </div>
      ) : null}
    </div>
  );
};

export default result;
