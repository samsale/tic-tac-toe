import React, { Component } from 'react'
import Box from './boxes.js'
import './App.css'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      attempt: 0,
      player1Name: "Player 1",
      player1Score: 0,
      player1Icon: "X",
      player2Name: "Player 2",
      player2Score: 0,
      player2Icon: "O",
      gameComplete: false,
      winner: null,
      gameBoard: ["","","","","","","","",""],
      player1: [0,0,0,0,0,0,0,0,0],
      player2: [0,0,0,0,0,0,0,0,0],
      pointerEvents: 'auto',
      winningArray: [],
    }
  }


createBoardLayout(){


    let arrayOfBoxes = this.state.gameBoard.map((value,i) => {
      if(value === ""){
        return (
          <Box id={i}  key={i} attemptNumber={this.state.attempt}
            getIndex={this.checkFunction.bind(this)} gameState={this.state.gameComplete}
            letter={value} pointerEvents={{pointerEvents: "auto"}} />
        )
      } else {
        return(
          <Box id={i}  key={i} attemptNumber={this.state.attempt}
            getIndex={this.checkFunction.bind(this)} gameState={this.state.gameComplete}
            letter={value} pointerEvents={{pointerEvents:"none"}}/>
        )
    }
  })

    return arrayOfBoxes
  }

checkFunction(clickLocation){
  let playerObject = this.updateBoard(clickLocation)
  this.checkBoardandResult(playerObject)
}


updateBoard(clickLocation){
  let {attempt} = this.state
  let gameBoard = [...this.state.gameBoard]
  console.log("Game", this.state.gameComplete);
  if(this.state.gameComplete === true){
    console.log("Game Complete");
    return {array:[], player:"Game Over"}
  }
  else if(attempt % 2 !== 0){
    let player2 = [...this.state.player2];
    player2.splice(clickLocation,1,1)
    gameBoard.splice(clickLocation,1,this.state.player2Icon)
    this.setState({player2 , attempt: attempt +1, gameBoard})
    return {array:player2, player:"Player 2"}
    } else{
      let player1 = [...this.state.player1];
      player1.splice(clickLocation,1,1)
      gameBoard.splice(clickLocation,1,this.state.player1Icon)
      this.setState({player1 , attempt: attempt +1, gameBoard})
      return {array:player1, player:"Player 1"}
  }
}

checkBoardandResult(playerObject){
  let {gameComplete, winner, attempt, winningArray, player2Score, player1Score} = this.state
  var winningPossibilites = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],
                            [1,4,7],[2,5,8],[0,4,8],[2,4,6]]

var resultsArray = winningPossibilites.filter((value) => this.testGame(value, playerObject.array))
if(resultsArray.length > 0){
  if(playerObject.player === "Player 1"){
    let player1Score = this.state.player1Score
    this.setState({player1Score: player1Score +1})
  }else{
    let player2Score = this.state.player2Score
    this.setState({player2Score: player2Score +1})
  }




  this.setState({gameComplete: true, winner: playerObject.player})



  for(let x of resultsArray[0]){
    document.getElementById(x).style.color="black"
    this.setState({winningArray: resultsArray[0],  })
  }
}else if(resultsArray.length === 0 && attempt === 8){
  this.setState({gameComplete: true, winner: "draw"})
}

}

testGame(winningArray,playerArray){
  var counter = 0
  let status = false
  for(let x of winningArray){
    if(playerArray[x] === 1){
      counter ++
    }
  }
  if (counter === 3){
    return true
  }
}

listenForResult(){
  let {gameComplete, winner} = this.state
  if(gameComplete && winner === "draw"){
    return "The Game is a Draw!"
  }else if(gameComplete && winner === "Player 2"){
    return `${winner} is the winner!`
  }else if(gameComplete && winner === "Player 1"){
    return `${winner} is the winner!`
}
}

resetGame(){
  this.setState({
    attempt: 0,
    gameComplete: false,
    winner: null,
    gameBoard: ["","","","","","","","",""],
    player1: [0,0,0,0,0,0,0,0,0],
    player2: [0,0,0,0,0,0,0,0,0],
    pointerEvents: 'auto',
  })
  if(this.state.winningArray.length > 0){
  for(let value of this.state.winningArray){
    document.getElementById(value).style.color=`#990000`
  }
  }
}

render(){
this.listenForResult()
    return (
      <div>
      <div className="ScoreBoard">
      <h1>Score</h1>
        <h2>Player 1 ({this.state.player1Score}) Player 2 ({this.state.player2Score})</h2>

      </div>
      <div className="Results">
        <h1>{this.listenForResult()}</h1>
      </div>
      <div className="Game">
        <div style={this.state.styles} className="board" >
          {this.createBoardLayout()}
        </div>
      </div>
      <div className='ResetGame'>
        <h1 onClick={this.resetGame.bind(this)}>New Game</h1>
      </div>
      </div>
    )
  }
}
