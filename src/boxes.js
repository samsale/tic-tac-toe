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

handleIndexChange(event){
    this.props.getIndex(event.target.id)
  }

  onClickFunction(event){
    this.GetBoxValue(event)
    this.handleIndexChange(event)

  }

  render(){
    return (
      <div style={this.state.styles} id={this.props.id} className="Boxes" onClick={this.onClickFunction.bind(this)}>
      </div>
    )
  }
}

export default Box
