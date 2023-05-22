import { Component } from "react";
import LifecycleChild from "./LifecycleChild";

export default class Lifecycle extends Component{
  constructor(){
    super()
    this.state={
      myName:"Sulochana",
      age:17,
 
    }
    console.log("I am from constructor")
  }
  static getDerivedStateFromProps(props,state){
    console.log("I am from getDerivedStateFromProps")
    return null
  }

  render(){
    console.log("I am from Render !!")
    return <div>
      <h2>Welcome to ReactJS Lifecycle hooks</h2>
      <LifecycleChild myName={this.state.myName} age={this.state.age}/>
    </div>
  }
  componentDidMount(){
    console.log("I am from componentDidMount !!")
  }
}