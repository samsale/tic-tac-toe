import React, { Component } from 'react'
import Box from './boxes.js'
import './App.css'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      attempt: 0,
      gameComplete: false,
      gameArray: [],
      player1: [0,0,0,0,0,0,0,0,0],
      player2: [0,0,0,0,0,0,0,0,0],
    }
  }





  componentDidMount(){
    this.createInitialBoard()

  }

createInitialBoard(){
    let {gameArray} = this.state
    gameArray = Array(9).fill(0)
    this.setState({gameArray: gameArray})
}



createBoardLayout(){
  return this.state.gameArray.map((value, index) =>
     <Box id={index} key={index}/>
  )
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
    // break
  }
}

checkBoardandResult(){
  var player = [0,1,1,1,1,1,0,0,0]
  var winningPossibilites = [[0,1,2],[3,4,5],[6,7,8],
                              [0,3,6],[1,4,7],[2,5,8],
                              [0,4,8],[2,4,6]]

var resultsArray = winningPossibilites.filter((value) => this.testGame(value, player))
  return resultsArray.length > 0 ? true : false

}


  render(){
console.log("Check:"+this.checkBoardandResult());


    return (
      <div className="board">
        {this.createBoardLayout()}
      </div>
    )
  }
}

export default Board
