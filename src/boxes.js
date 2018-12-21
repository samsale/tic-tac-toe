import React, { Component } from 'react'
import './App.css'
import Board from './Board'



export default class Box extends Component {
  constructor(props){
    super(props)
    this.state = {
      styles:{
        width:'100px',
        height:'100px',
        characterOnBoard: '',
        pointerEvents: 'auto',
        color: `#990000`,
      }
    }
  }

updateBox(){
  let styles = {...this.state.styles}
  if(this.props.gameState){
    return
  } else if(this.props.attemptNumber%2 === 0){
    styles.characterOnBoard = 'X'
    this.setState({styles})
  } else {
    styles.characterOnBoard = 'O'
    this.setState({styles})
  }
  styles.pointerEvents = 'none'
    this.setState(styles)
}

clearBoxes(){
  this.setState({
    styles:{
      width:'100px',
      height:'100px',
      characterOnBoard: '',
      pointerEvents: 'auto',
      color: `#990000`,
    }
  })
}


handleIndexChange(event){
    this.props.getIndex(event.target.id)
  }

  onClickFunction(event){
    this.handleIndexChange(event)
    this.updateBox()
  }

  render(){

    return (
        <div style={this.state.styles} id={this.props.id}  onClick={this.onClickFunction.bind(this)}>
          {this.state.styles.characterOnBoard}
        </div>
    )
  }
}
