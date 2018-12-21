import React, { Component } from 'react'
import './App.css'
import Board from './Board'


export default class Box extends Component {
  constructor(props){
    super(props)
    this.letter = ""
    this.state = {
      
    }
  }



handleIndexChange(event){
    this.props.getIndex(event.target.id)
  }

  onClickFunction(event){
    this.handleIndexChange(event)
  }


  render(){

    return (
        <div className="box" style={this.props.pointerEvents} id={this.props.id}  onClick={this.onClickFunction.bind(this)}>
          {this.props.letter}
        </div>
    )
  }
}
