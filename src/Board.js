import React, { Component } from 'react'
import Box from './boxes.js'
import './App.css'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      attempt: 0,
      gameComplete: false,
      player1: [0,0,0,0,0,0,0,0,0],
      player2: [0,0,0,0,0,0,0,0,0],
      boardSize:9,
    }
  }

updateBoard(index){
  console.log("clicked");
  let {attempt} = this.state
  if(attempt % 2 === 0){
    let player2 = [...this.state.player2];
    player2.splice(index,1,1)
    this.setState({player2 , attempt: attempt +1})
    }else{
      let player1 = [...this.state.player1];
      player1.splice(index,1,1)
      this.setState({player1 , attempt: attempt +1})
  }
}

createBoardLayout(){
  let arrayOfBoxes = []
  let i = 0
  while (i < 9){
    arrayOfBoxes.push(<Box id={i} key={i} attemptNumber={this.state.attempt} getIndex={this.updateBoard.bind(this)}/>)
    i ++
  }return arrayOfBoxes
}

checkBoardandResult(){
  var player = [0,1,1,1,1,1,0,0,0]
  var winningPossibilites = [[0,1,2],[3,4,5],[6,7,8],
                              [0,3,6],[1,4,7],[2,5,8],
                              [0,4,8],[2,4,6]]

var resultsArray = winningPossibilites.filter((value) => this.testGame(value, player))
  return resultsArray.length > 0 ? true : false
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

  render(){

    return (
      <div className="board">
        {this.createBoardLayout()}
      </div>
    )
  }
}

export default Board
