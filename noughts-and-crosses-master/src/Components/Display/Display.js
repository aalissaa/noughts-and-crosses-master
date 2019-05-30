import React from "react";
import "./Display.css";

const display = props => {
  const player1 = props.player1;
  const player2 = props.player2;

  return (
    <div className="Display">
      <div className="player1">
        <span>Player 1: {player1.name}</span>
        <span>Wins: {player1.wins}</span>
      </div>
      <div className="player2">
        <span>Player 2: {player2.name}</span>
        <span>Wins: {player2.wins}</span>
      </div>
    </div>
  );
};

export default display;
