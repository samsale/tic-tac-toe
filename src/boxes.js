import React, { Component } from 'react'
import './App.css'

class Box extends Component {
  constructor(props){
    super(props)
    this.state = {
      styles:{
        width:'100px',
        height:'100px',
        border: '2px solid black'
      }
    }
  }
  GetBoxValue(e){
    console.log("ID:", e.target.id);
  }

  render(){
    return (
      <div style={this.state.styles} id={this.props.id} className="Boxes" onClick={this.GetBoxValue.bind(this)}>
      </div>
    )
  }
}

export default Box
