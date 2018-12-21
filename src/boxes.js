import React, { Component } from 'react'
import './App.css'
import Board from './Board'


export default class Box extends Component {
  constructor(props){
    super(props)
    this.letter = ""
    this.state = {
      pointerEvents: 'auto',
    }
  }

updateBox(event){
  let {pointerEvents} = this.state
  console.log(this.props.gameState);
  if(this.props.gameState){
    return "complete"
  } else if(this.props.attemptNumber%2 === 0){
    this.letter='X'
    this.forceUpdate()
  } else {
    this.letter='0'
    this.forceUpdate()
  }
    this.setState({pointerEvents: 'none'})
}

handleIndexChange(event){
    this.props.getIndex(event.target.id)
  }

  onClickFunction(event){
    this.handleIndexChange(event)
    this.updateBox(event.target.id)
  }

  render(){
    console.log("props",this.props);
    return (
        <div className="box" style={this.state} id={this.props.id}  onClick={this.onClickFunction.bind(this)}>
          {this.props.letter}
        </div>
    )
  }
}
