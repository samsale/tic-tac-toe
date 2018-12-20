import React, { Component } from 'react'
import './App.css'

class Box extends Component {
  constructor(props){
    super(props)
    this.state = {
      styles:{
        width:'100px',
        height:'100px',
        border: '2px solid black',
        characterOnBoard: '',
        pointerEvents: 'auto',
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

listenForGameState(){
  if(this.props.gameState){
    return true
  }
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
      <div style={this.state.styles} id={this.props.id} className="Boxes" onClick={this.onClickFunction.bind(this)}>
      {this.state.styles.characterOnBoard}
      </div>
    )
  }
}

export default Box
