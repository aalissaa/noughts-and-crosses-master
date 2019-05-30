import React, { Component } from "react";
import "./App.css";
import Fields from "../Components/Fields/Fields";
import Display from "../Components/Display/Display";
import Result from "../Components/Result/Result";
import Names from "../Components/Names/Names"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mat: [["", "", ""], ["", "", ""], ["", "", ""]],
      players: [{},{}],
      turn: null,
      currentPlayer: null,
      isFinished: false,
      tie: false,
      player1: '',
      player2: '',
      showing: false,
      button: "Start!",
    };
  }

  chooseField = pos => {
    const { row, col } = pos;

    let matrix = [...this.state.mat];
    if (matrix[row][col] !== "") {
      return;
    }

    const currentPlayer = this.changeCurrentPlayer(this.state.currentPlayer);
    matrix[row][col] = currentPlayer.opc;

    this.setState({
      mat: matrix
    });

    this.checkGame(matrix, pos);
  };

  changeInitialPlayer = playerTurn => {
    const player = this.alternatePlayer(playerTurn);
    this.setState({
      turn: player
    });
  };

  changeCurrentPlayer = curPlayer => {
    const player = this.alternatePlayer(curPlayer);

    this.setState(() => {
      return {
        currentPlayer: player
      };
    });

    return player;
  };

  alternatePlayer = player => {
    if (!player) {
      return (player = this.state.players[0]);
    }
    return player.name === this.state.players[0].name
      ? this.state.players[1]
      : this.state.players[0];
  };

  updateScoreboard(winner) {
    const players = this.state.players.map(player => {
      if (player.name === winner.name) {
        player.wins++;
      }
      return player;
    });

    this.setState({
      players: players
    });
  }

  checkGame = (matrix, pos) => {
    const { row, col } = pos;

    const rowWin = this.checkRow(matrix[row]);

    const columnWin = this.checkColumn(matrix, col);

    const diagonalWin = this.checkDiagonal(matrix);

    const isGameFinished = rowWin || columnWin || diagonalWin;

    this.updateGameStatus(isGameFinished);

    if (!isGameFinished) {
      this.checkTie();
    }
  };

  updateGameStatus = isGameFinished => {
    if (isGameFinished !== this.state.isFinished) {
      this.setState(
        state => ({
          isFinished: !state.isFinished
        }),
        () => this.updateScoreboard(this.state.currentPlayer)
      );
    }
  };

  checkTie = () => {
    let emptyFields = this.state.mat.every(row =>
      row.every(value => value !== "")
    );

    if (emptyFields) {
      this.setState(state => ({
        isFinished: !state.isFinished,
        tie: !state.tie
      }));
    }
  };

  checkDiagonal = mat => {
    if (!mat[1][1]) {
      return false;
    }
    const mainDiagonal = mat[0][0] === mat[1][1] && mat[0][0] === mat[2][2];
    const secondDiagonal = mat[2][0] === mat[1][1] && mat[2][0] === mat[0][2];

    return mainDiagonal || secondDiagonal;
  };

  checkRow = (vet, index = 0) => {
    if (vet[index] !== vet[index + 1]) {
      if (index + 1 >= vet.length) {
        return true;
      }
      return false;
    }
    return this.checkRow(vet, index + 1);
  };
  checkColumn = (mat, col) => {
    for (let i = 0; i < mat.length - 1; i++) {
      if (mat[i][col] !== mat[i + 1][col]) {
        return false;
      }
    }
    return true;
  };

  clearGameBoard = () => {
    const newGameBoard = [["","",""],["","",""],["","",""]];
    this.setState({
      mat: newGameBoard,
      isFinished: false,
      tie: false
    })
  }

  setPlayersData = () => {
    this.setState({
      players: [{id:this.state.player1.name, name: this.state.player1, opc: "x", wins:0},
      {id: this.state.player2.name, name: this.state.player2, opc:"o", wins: 0}],
    })

    this.changeButton()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeButton = () => {
    let show, btnText
    if(this.state.showing===false){
      show= true
      btnText="Change Players"
    } else {
      show=false
      btnText="Start!"
    }
    this.setState({
      button: btnText,
      showing: show
    })
  }

  render() {
    const { player1, player2 } = this.state;
    return (
      <div className="App">
        <div>
          <Names name="1" target="player1" value={player1} handleChange={this.handleChange} showing={this.state.showing}/>
          <Names name="2" target="player2" value={player2} handleChange={this.handleChange} showing={this.state.showing}/>
          <button className= "ButtonChange" onClick={this.setPlayersData}>{this.state.button}</button>
        </div>
        <div>
          <Display
            player1={this.state.players[0]}
            player2={this.state.players[1]}
          />
        </div>
        <div className="table" disabled>
          <Fields
            disabled={this.state.isFinished}
            fields={this.state.mat}
            click={pos => this.chooseField(pos)}
          />
        </div>
        <div>
          <Result
            click={this.clearGameBoard}
            tie={this.state.tie}
            player={this.state.currentPlayer}
            status={this.state.isFinished}
          />
        </div>
      </div>
    );
  }
}

export default App;
