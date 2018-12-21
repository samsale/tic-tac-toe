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
      player2Name: "Player 2",
      player2Score: 0,
      gameComplete: false,
      winner: null,
      player1: [0,0,0,0,0,0,0,0,0],
      player2: [0,0,0,0,0,0,0,0,0],
    }
  }
createBoardLayout(){
    let arrayOfBoxes = []
    let i = 0
    while (i < 9){
      arrayOfBoxes.push(<Box id={i} key={i} attemptNumber={this.state.attempt} getIndex={this.checkFunction.bind(this)} gameState={this.state.gameComplete}/>)
      i ++
    }return arrayOfBoxes
  }

checkFunction(clickLocation){
  let playerObject = this.updateBoard(clickLocation)
  this.checkBoardandResult(playerObject)
}

updateBoard(clickLocation){
  let {attempt} = this.state
  if(attempt % 2 === 0){
    let player2 = [...this.state.player2];
    player2.splice(clickLocation,1,1)
    this.setState({player2 , attempt: attempt +1})
    return {array:player2, player:"Player 2"}
    } else{
      let player1 = [...this.state.player1];
      player1.splice(clickLocation,1,1)
      this.setState({player1 , attempt: attempt +1})
      return {array:player1, player:"Player 1"}
  }
}




checkBoardandResult(playerObject){
  let {gameComplete, winner, attempt} = this.state
  var winningPossibilites = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],
                            [1,4,7],[2,5,8],[0,4,8],[2,4,6]]

var resultsArray = winningPossibilites.filter((value) => this.testGame(value, playerObject.array))
if(resultsArray.length > 0){
  this.setState({gameComplete: true, winner: playerObject.player})
  for(let x of resultsArray[0]){
    document.getElementById(x).style.color="black"
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
  }else if(gameComplete){
    return `${winner} is the winner!`
  }
}

reset(){
  this.setState({
    attempt:0,
    gameComplete: false,
    winner: null,
    player1: [0,0,0,0,0,0,0,0,0],
    player2: [0,0,0,0,0,0,0,0,0],
  })
}




  render(){
console.log(this.state)
this.listenForResult()

    return (
      <div>
      <div className="Results">
        <h1>{this.listenForResult()}</h1>
      </div>
      <div className="Game">
        <div style={this.state.styles} className="board">
          {this.createBoardLayout()}
        </div>
      </div>
      </div>
    )
  }
}
